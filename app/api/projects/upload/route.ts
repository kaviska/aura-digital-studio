import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getProjectImageBucket } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function errorResponse(
  status: number,
  code: string,
  error: string,
  cause?: unknown,
) {
  const response: { error: string; code: string; details?: string } = {
    error,
    code,
  };

  if (process.env.DEBUG_API_ERRORS === "true" && cause) {
    response.details = cause instanceof Error ? cause.message : String(cause);
  }

  return NextResponse.json(response, { status });
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return errorResponse(400, "IMAGE_REQUIRED", "Choose an image file before uploading.");
    }

    if (!allowedTypes.has(file.type)) {
      return errorResponse(
        415,
        "UNSUPPORTED_IMAGE_TYPE",
        "Unsupported image type. Use JPG, PNG, WEBP, or GIF.",
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return errorResponse(413, "IMAGE_TOO_LARGE", "Image must be smaller than 5MB.");
    }

    const bucket = getProjectImageBucket();
    const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { purpose: "project-image", contentType: file.type },
    });

    await new Promise<void>((resolve, reject) => {
      uploadStream.once("finish", resolve);
      uploadStream.once("error", reject);
      uploadStream.end(fileBuffer);
    });

    return NextResponse.json({ image: `/api/projects/image/${uploadStream.id.toString()}` });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return errorResponse(401, "UNAUTHORIZED", "Your admin session expired. Sign in again.");
    }

    console.error("Project image upload failed:", error);
    if (error instanceof Error && error.message.includes("MONGODB_URI")) {
      return errorResponse(
        503,
        "MONGODB_NOT_CONFIGURED",
        "MongoDB is not configured for image storage. Set MONGODB_URI in the deployment environment.",
        error,
      );
    }

    if (error instanceof Error && /Mongo|GridFS|MongoServer/i.test(error.name + error.message)) {
      return errorResponse(
        503,
        "GRIDFS_UNAVAILABLE",
        "MongoDB GridFS could not store the image. Check MongoDB Atlas connectivity and permissions.",
        error,
      );
    }

    if (error instanceof TypeError) {
      return errorResponse(
        400,
        "INVALID_UPLOAD_REQUEST",
        "The upload request was invalid or incomplete.",
        error,
      );
    }

    return errorResponse(
      500,
      "UPLOAD_FAILED",
      "The server could not save this image. Check the Network response details and server logs.",
      error,
    );
  }
}
