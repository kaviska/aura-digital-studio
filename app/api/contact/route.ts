import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    const messages = getDatabase().collection("contactMessages");
    const recent = await messages.countDocuments({
      ip,
      createdAt: { $gte: new Date(Date.now() - RATE_WINDOW_MS) },
    });
    if (recent >= RATE_MAX) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a few minutes or contact us on WhatsApp." },
        { status: 429 },
      );
    }

    await messages.insertOne({
      name,
      email,
      subject,
      message,
      status: "new",
      ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 300) || "",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact message save failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email or WhatsApp us instead." },
      { status: 503 },
    );
  }
}
