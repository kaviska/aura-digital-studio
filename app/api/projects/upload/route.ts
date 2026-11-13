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

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "An image file is required" }, { status: 400 });
    }

    const extension = allowedTypes.get(file.type);
    if (!extension) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, and GIF images are supported" },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Images must be smaller than 5MB" }, { status: 400 });
    }

    const uploadDirectory = path.join(process.cwd(), "public", "uploads", "projects");
    await mkdir(uploadDirectory, { recursive: true });
    const filename = `${randomUUID()}${extension}`;
    await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ image: `/uploads/projects/${filename}` });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Project image upload failed:", error);
    return NextResponse.json({ error: "Unable to upload image" }, { status: 500 });
  }
}
