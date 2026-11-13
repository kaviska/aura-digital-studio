import { GridFSBucket, MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  const client =
    globalForMongo.mongoClient ?? new MongoClient(uri);

  if (process.env.NODE_ENV !== "production") {
    globalForMongo.mongoClient = client;
  }

  return client;
}

export function getDatabase() {
  return getMongoClient().db(process.env.MONGODB_DB || "aura_digital_studio");
}

export function getProjectImageBucket() {
  return new GridFSBucket(getDatabase(), { bucketName: "projectImages" });
}
