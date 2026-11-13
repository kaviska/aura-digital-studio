import { NextResponse } from "next/server";
import {
  createAdminSession,
  ensureAdminUser,
  validateAdminCredentials,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    await ensureAdminUser();

    if (!email || !(await validateAdminCredentials(email, password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await createAdminSession(email);
    return NextResponse.json({ email });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
