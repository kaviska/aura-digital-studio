import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { toAdminProject, type ProjectDocument } from "@/lib/project";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const projects = await getDatabase()
      .collection<ProjectDocument>("projects")
      .find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(projects.map(toAdminProject));
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Admin project lookup failed:", error);
    return NextResponse.json({ error: "Unable to load projects" }, { status: 500 });
  }
}
