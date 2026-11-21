import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import type { AdminContactMessage } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const messages = await getDatabase()
      .collection("contactMessages")
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    const result: AdminContactMessage[] = messages.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      subject: doc.subject,
      message: doc.message,
      status: doc.status === "read" ? "read" : "new",
      createdAt: new Date(doc.createdAt).toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Admin message lookup failed:", error);
    return NextResponse.json({ error: "Unable to load messages" }, { status: 500 });
  }
}
