"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageEffects } from "@/components/PageEffects";
import type { InfoPage } from "@/content/pages";
import { WHATSAPP_URL } from "@/lib/contact";

const toId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type RelatedLink = { title: string; href: string };

/** One shared layout for service detail pages and legal pages. */
export function InfoPageLayout({ page, related = [] }: { page: InfoPage; related?: RelatedLink[] }) {
  return (
    <div className="min-h-screen bg-background">
      <PageEffects />

      {/* Compact top bar */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
        <div className="container mx-auto flex h-16 items-center justify-between rounded-2xl border border-border/60 bg-background/75 px-4 shadow-lg shadow-black/5 backdrop-blur-xl sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo%20(1).png" alt="OOLLN logo" width={36} height={36} />
            <span className="font-display text-xl font-bold">OOLLN</span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <a href="/">
                <ArrowLeft className="h-4 w-4" /> Home
              </a>
            </Button>
            <Button variant="hero" size="sm" className="rounded-full px-5" asChild>
              <a href="/#contact">Get in touch</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Page hero */}
      <section className="relative overflow-hidden pb-12 pt-36 md:pb-16 md:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="aurora-blob left-[-10%] top-[-20%] h-[30vmax] w-[30vmax] bg-primary/40" />
          <div className="aurora-blob right-[-10%] top-[0%] h-[25vmax] w-[25vmax] bg-accent/40" style={{ animationDelay: "-8s" }} />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <a href="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:hidden">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </a>
            <span className="section-eyebrow">{page.eyebrow}</span>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="gradient-text">{page.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">{page.intro}</p>
            {page.updated && (
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" /> Last updated {page.updated}
              </p>
            )}
            {page.highlights && (
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {page.highlights.map((item) => (
                  <span key={item} className="tech-badge">{item}</span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1 border-l border-border pl-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</p>
              {page.sections.map((section) => (
                <a
                  key={section.heading}
                  href={`#${toId(section.heading)}`}
                  className="block py-1 text-sm text-muted-foreground transition-colors hover:text-cyan"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            {page.sections.map((section, index) => (
              <motion.article
                key={section.heading}
                id={toId(section.heading)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: Math.min(index, 2) * 0.05 }}
                className="spotlight relative scroll-mt-28 rounded-2xl border border-border/60 bg-card/60 p-6 md:p-8"
              >
                <h2 className="mb-4 font-display text-2xl font-bold">{section.heading}</h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="mb-4 leading-relaxed text-muted-foreground last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-2 space-y-3">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground md:p-10"
            >
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <h2 className="relative mb-3 font-display text-2xl font-bold md:text-3xl">
                {page.cta?.title ?? "Questions about this page?"}
              </h2>
              <p className="relative mb-6 max-w-xl text-primary-foreground/85">
                {page.cta?.text ?? "Our team is happy to help. Send us a message and we'll get back to you within 24 hours."}
              </p>
              <div className="relative flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <a href="/#contact">
                    Contact us <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            {related.length > 0 && (
              <div className="pt-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {page.eyebrow === "Service" ? "Other services" : "Related pages"}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/60 px-5 py-4 transition-colors hover:border-primary/50"
                    >
                      <span className="font-medium group-hover:text-cyan">{link.title}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-cyan" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
