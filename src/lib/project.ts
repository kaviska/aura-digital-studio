import { ObjectId } from "mongodb";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export type ProjectCredential = {
  label: string;
  username: string;
  password: string;
  notes?: string;
};

export type PublicProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  sortOrder: number;
};

export type ProjectDocument = {
  _id?: ObjectId;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  sortOrder: number;
  credentials: Array<{
    label: string;
    username: string;
    password: string;
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

function getEncryptionKey() {
  const key = process.env.CREDENTIAL_ENCRYPTION_KEY;

  if (!key) {
    throw new Error("CREDENTIAL_ENCRYPTION_KEY is not configured");
  }

  return Buffer.from(key, "base64");
}

export function encryptCredential(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv, tag, encrypted].map((part) => part.toString("base64")).join(".");
}

export function decryptCredential(value: string) {
  const [ivValue, tagValue, encryptedValue] = value.split(".");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(ivValue, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tagValue, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

export function toPublicProject(project: ProjectDocument): PublicProject {
  return {
    id: project._id?.toString() || "",
    title: project.title,
    description: project.description,
    image: project.image,
    category: project.category,
    techStack: project.techStack,
    liveUrl: project.liveUrl || undefined,
    sortOrder: project.sortOrder,
  };
}

export function toAdminProject(project: ProjectDocument) {
  return {
    ...toPublicProject(project),
    credentials: project.credentials.map((credential) => ({
      ...credential,
      password: decryptCredential(credential.password),
    })),
  };
}
