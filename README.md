# Aura Digital Studio

Next.js portfolio website with a protected project administration panel.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` to your MongoDB connection string.
3. Set `SESSION_SECRET` to a long random value.
4. Generate a base64 32-byte `CREDENTIAL_ENCRYPTION_KEY`.
5. Keep `ADMIN_EMAIL` and `ADMIN_PASSWORD` as the initial admin credentials.

```bash
npm install
npm run dev
```

The public website is available at `/`. The admin login is at `/admin/login`.

Project images are stored in `public/uploads/projects` during development. A persistent object-storage provider should be used when deploying to a serverless host.
