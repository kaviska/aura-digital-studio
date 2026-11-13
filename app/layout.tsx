import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "OOLLN - We Build Scalable Digital Solutions | IT Company",
  description:
    "Transform your business with cutting-edge technology. Oolin delivers innovative web, mobile, and software solutions that drive growth and efficiency.",
  keywords: [
    "IT company",
    "software development",
    "web development",
    "mobile apps",
    "SaaS",
    "custom software",
    "React",
    "Node.js",
  ],
  openGraph: {
    title: "Oolin - We Build Scalable Digital Solutions",
    description:
      "Transform your business with cutting-edge technology. We deliver innovative web, mobile, and software solutions.",
    type: "website",
  },
  alternates: {
    canonical: "https://Oolin.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
