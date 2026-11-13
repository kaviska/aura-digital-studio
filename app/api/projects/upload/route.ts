import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { requireAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

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

    const extension = allowedTypes.get(file.type);
    if (!extension) {
      return errorResponse(
        415,
        "UNSUPPORTED_IMAGE_TYPE",
        "Unsupported image type. Use JPG, PNG, WEBP, or GIF.",
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return errorResponse(413, "IMAGE_TOO_LARGE", "Image must be smaller than 5MB.");
    }

    const uploadDirectory = path.join(process.cwd(), "public", "uploads", "projects");
    await mkdir(uploadDirectory, { recursive: true });
    const filename = `${randomUUID()}${extension}`;
    await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ image: `/uploads/projects/${filename}` });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return errorResponse(401, "UNAUTHORIZED", "Your admin session expired. Sign in again.");
    }

    console.error("Project image upload failed:", error);
    const code = (error as NodeJS.ErrnoException)?.code;

    if (code === "EROFS" || code === "EACCES" || code === "ENOENT") {
      return errorResponse(
        503,
        "UPLOAD_STORAGE_UNAVAILABLE",
        "The server cannot write uploaded files. Vercel does not provide persistent local file storage; configure Cloudinary or S3 for production uploads.",
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
