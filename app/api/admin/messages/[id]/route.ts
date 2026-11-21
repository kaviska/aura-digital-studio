import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(error: unknown, fallback: string) {
  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.error(fallback, error);
  return NextResponse.json({ error: fallback }, { status: 400 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
    }
    const { status } = await request.json();
    if (status !== "read" && status !== "new") {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const result = await getDatabase()
      .collection("contactMessages")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { status, updatedAt: new Date() } });

    return result.matchedCount
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: "Message not found" }, { status: 404 });
  } catch (error) {
    return errorResponse(error, "Unable to update message");
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
    }
    const result = await getDatabase()
      .collection("contactMessages")
      .deleteOne({ _id: new ObjectId(params.id) });

    return result.deletedCount
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: "Message not found" }, { status: 404 });
  } catch (error) {
    return errorResponse(error, "Unable to delete message");
  }
}
