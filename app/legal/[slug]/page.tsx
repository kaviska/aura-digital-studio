import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageLayout } from "@/components/InfoPageLayout";
import { findLegalPage, legalPages } from "@/content/pages";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const page = findLegalPage(params.slug);
  return page ? { title: `${page.title} | OOLLN`, description: page.intro } : {};
}

export default function LegalPage({ params }: Params) {
  const page = findLegalPage(params.slug);
  if (!page) notFound();

  const related = legalPages
    .filter((item) => item.slug !== page.slug)
    .map((item) => ({ title: item.title, href: `/legal/${item.slug}` }));

  return <InfoPageLayout page={page} related={related} />;
}
