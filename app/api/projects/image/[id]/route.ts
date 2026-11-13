import { ObjectId } from "mongodb";
import { Readable } from "node:stream";
import { getProjectImageBucket } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!ObjectId.isValid(params.id)) {
    return Response.json({ error: "Invalid image id", code: "INVALID_IMAGE_ID" }, { status: 400 });
  }

  try {
    const id = new ObjectId(params.id);
    const bucket = getProjectImageBucket();
    const file = await bucket.find({ _id: id }).next();

    if (!file) {
      return Response.json({ error: "Image not found", code: "IMAGE_NOT_FOUND" }, { status: 404 });
    }

    const stream = bucket.openDownloadStream(id);
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        "Content-Type": file.metadata?.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Project image lookup failed:", error);
    return Response.json(
      {
        error: "MongoDB GridFS could not read the image",
        code: "GRIDFS_READ_FAILED",
        ...(process.env.DEBUG_API_ERRORS === "true" && {
          details: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 503 },
    );
  }
}
