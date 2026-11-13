import { clearAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  clearAdminSession();
  return Response.json({ success: true });
}
