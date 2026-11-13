import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    if (!Array.isArray(body.projects)) {
      return NextResponse.json({ error: "Invalid project order" }, { status: 400 });
    }

    const operations = body.projects.map((project: { id: string }, index: number) => ({
      updateOne: {
        filter: { _id: new ObjectId(project.id) },
        update: { $set: { sortOrder: index, updatedAt: new Date() } },
      },
    }));

    if (operations.length) {
      await getDatabase().collection("projects").bulkWrite(operations);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Project reorder failed:", error);
    return NextResponse.json({ error: "Unable to reorder projects" }, { status: 400 });
  }
}
