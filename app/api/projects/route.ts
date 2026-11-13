import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { toPublicProject, type ProjectDocument } from "@/lib/project";
import { requireAdminSession } from "@/lib/auth";
import { parseProject } from "@/lib/project-input";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getDatabase()
      .collection<ProjectDocument>("projects")
      .find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(projects.map(toPublicProject));
  } catch (error) {
    console.error("Public project lookup failed:", error);
    return NextResponse.json({ error: "Unable to load projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const project = parseProject(await request.json());
    const now = new Date();
    const result = await getDatabase().collection("projects").insertOne({
      ...project,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Project creation failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create project" },
      { status: 400 },
    );
  }
}

