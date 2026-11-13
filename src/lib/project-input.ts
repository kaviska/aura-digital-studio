import { encryptCredential, type ProjectCredential, type ProjectDocument } from "./project";

export function parseProject(body: Record<string, unknown>, existing?: ProjectDocument) {
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const image = String(body.image || "").trim();
  const category = String(body.category || "Web Apps").trim();
  const techStack = Array.isArray(body.techStack)
    ? body.techStack.map(String).map((value) => value.trim()).filter(Boolean)
    : [];
  const liveUrl = String(body.liveUrl || "").trim();
  const sortOrder = Number.isFinite(Number(body.sortOrder))
    ? Number(body.sortOrder)
    : existing?.sortOrder || 0;
  const credentials = Array.isArray(body.credentials)
    ? (body.credentials as ProjectCredential[])
        .map((credential) => ({
          label: String(credential.label || "").trim(),
          username: String(credential.username || "").trim(),
          password: String(credential.password || ""),
          notes: String(credential.notes || "").trim(),
        }))
        .filter((credential) => credential.label && credential.username && credential.password)
        .map((credential) => ({
          ...credential,
          password: encryptCredential(credential.password),
        }))
    : existing?.credentials || [];

  if (!title || !description || !image) {
    throw new Error("Title, description, and image are required");
  }

  return {
    title,
    description,
    image,
    category,
    techStack,
    liveUrl: liveUrl || undefined,
    sortOrder,
    credentials,
  };
}
