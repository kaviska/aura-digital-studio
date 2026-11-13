import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  return Response.json({ authenticated: Boolean(session), email: session?.email });
}
