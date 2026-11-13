import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getDatabase } from "./mongodb";

const SESSION_COOKIE = "aura_admin_session";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

type AdminSession = {
  email: string;
};

export async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  const users = getDatabase().collection<{
    _id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }>("admins");
  const existing = await users.findOne({ _id: email });

  if (!existing) {
    await users.insertOne({
      _id: email,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export async function validateAdminCredentials(email: string, password: string) {
  const admin = await getDatabase()
    .collection<{ _id: string; email: string; passwordHash: string }>("admins")
    .findOne({ _id: email });

  return admin ? bcrypt.compare(password, admin.passwordHash) : false;
}

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email } satisfies AdminSession)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminSession() {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return typeof payload.email === "string" ? { email: payload.email } : null;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
