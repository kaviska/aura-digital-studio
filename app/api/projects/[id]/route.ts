import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { toAdminProject, toPublicProject, type ProjectDocument } from "@/lib/project";
import { parseProject } from "@/lib/project-input";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getId(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid project id");
  }
  return new ObjectId(id);
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdminSession();
    const project = await getDatabase()
      .collection<ProjectDocument>("projects")
      .findOne({ _id: getId(params.id) });

    return project
      ? NextResponse.json(toAdminProject(project))
      : NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Unable to load project" }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdminSession();
    const id = getId(params.id);
    const collection = getDatabase().collection<ProjectDocument>("projects");
    const existing = await collection.findOne({ _id: id });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const update = parseProject(await request.json(), existing);
    await collection.updateOne({ _id: id }, { $set: { ...update, updatedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Project update failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update project" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdminSession();
    const result = await getDatabase()
      .collection<ProjectDocument>("projects")
      .deleteOne({ _id: getId(params.id) });

    return result.deletedCount
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Project deletion failed:", error);
    return NextResponse.json({ error: "Unable to delete project" }, { status: 400 });
  }
}
