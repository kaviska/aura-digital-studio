import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageLayout } from "@/components/InfoPageLayout";
import { findServicePage, servicePages } from "@/content/pages";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const page = findServicePage(params.slug);
  return page ? { title: `${page.title} | OOLLN`, description: page.intro } : {};
}

export default function ServicePage({ params }: Params) {
  const page = findServicePage(params.slug);
  if (!page) notFound();

  const related = servicePages
    .filter((item) => item.slug !== page.slug)
    .map((item) => ({ title: item.title, href: `/services/${item.slug}` }));

  return <InfoPageLayout page={page} related={related} />;
}
