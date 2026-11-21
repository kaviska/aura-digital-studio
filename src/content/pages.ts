import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/contact";

export type PageSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type InfoPage = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  highlights?: string[];
  sections: PageSection[];
  cta?: { title: string; text: string };
};

const COMPANY = "OOLLN";
const ADDRESS = "383-24 Oyaguchi, Matsudo, Chiba 270-0005, Japan";
const UPDATED = "November 21, 2026";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const servicePages: InfoPage[] = [
  {
    slug: "web-development",
    eyebrow: "Service",
    title: "Web Development",
    intro:
      "Fast, secure and search-friendly websites and web applications built with React, Next.js and Laravel, designed to turn visitors into customers and scale as your business grows.",
    highlights: ["Next.js & React", "Laravel & PHP", "SEO-ready", "Mobile-first"],
    sections: [
      {
        heading: "What we build",
        list: [
          "Company websites and landing pages that load in under two seconds",
          "Custom web applications, dashboards and admin panels",
          "E-commerce stores with secure checkout and inventory management",
          "Booking, ticketing and membership platforms",
          "Progressive Web Apps that work offline and install like native apps",
        ],
      },
      {
        heading: "How we work",
        body: [
          "Every project starts with a short discovery session where we learn about your business, your customers and what success looks like. From there we produce a clear scope, timeline and fixed quote so there are no surprises.",
          "We build in two-week sprints and share a live preview link from the first week, so you can click through real progress instead of waiting for a big reveal at the end.",
        ],
      },
      {
        heading: "What's included",
        list: [
          "Responsive design tested on phones, tablets and desktops",
          "On-page SEO, meta tags, sitemaps and fast Core Web Vitals",
          "Analytics setup so you can measure visitors and conversions",
          "Deployment to reliable hosting with SSL and automated backups",
          "30 days of free support after launch",
        ],
      },
    ],
    cta: { title: "Planning a new website?", text: "Tell us what you have in mind and we'll reply with ideas and a ballpark estimate within 24 hours." },
  },
  {
    slug: "mobile-app-development",
    eyebrow: "Service",
    title: "Mobile App Development",
    intro:
      "Cross-platform iOS and Android apps built with Flutter and React Native. One codebase, native performance and a smooth path to the App Store and Google Play.",
    highlights: ["Flutter", "React Native", "iOS & Android", "Store publishing"],
    sections: [
      {
        heading: "Apps we deliver",
        list: [
          "Customer-facing apps for ordering, booking and loyalty programs",
          "Companion apps for existing web platforms and POS systems",
          "Internal tools for field staff, delivery and inventory teams",
          "MVPs to validate a new product idea quickly",
        ],
      },
      {
        heading: "Why cross-platform",
        body: [
          "Building one app that runs on both iOS and Android typically cuts development time and cost by 30–40% compared with two separate native apps, while still delivering smooth animations and access to device features like the camera, GPS and push notifications.",
        ],
      },
      {
        heading: "From idea to store",
        list: [
          "Wireframes and clickable prototype before development starts",
          "Backend APIs, authentication and push notifications",
          "Testing on real devices across screen sizes",
          "App Store and Google Play submission handled for you",
          "Ongoing updates as new OS versions are released",
        ],
      },
    ],
    cta: { title: "Have an app idea?", text: "Share it with us and we'll help you shape it into a launch-ready product." },
  },
  {
    slug: "ui-ux-design",
    eyebrow: "Service",
    title: "UI/UX Design",
    intro:
      "Interfaces that look great and are effortless to use. We combine user research, clear information architecture and polished visual design to create products people enjoy.",
    highlights: ["Figma", "Prototyping", "Design systems", "Usability testing"],
    sections: [
      {
        heading: "Our design process",
        list: [
          "Research: understand your users, competitors and business goals",
          "Wireframes: map out structure and user flows before visuals",
          "Visual design: brand-aligned, accessible, modern interfaces",
          "Prototype: interactive Figma prototypes you can click through",
          "Handoff: developer-ready specs and reusable components",
        ],
      },
      {
        heading: "Design that converts",
        body: [
          "Good design is not just about looking nice. Clear navigation, readable typography and obvious calls to action directly increase sign-ups, sales and customer satisfaction. We design every screen around the action you want users to take.",
        ],
      },
      {
        heading: "Deliverables",
        list: [
          "User flows and wireframes",
          "High-fidelity screens for mobile and desktop",
          "A reusable design system with colors, type and components",
          "Interactive prototype for stakeholder review",
        ],
      },
    ],
    cta: { title: "Need a fresh look?", text: "Whether it's a redesign or a brand-new product, we'd love to see what you're working on." },
  },
  {
    slug: "saas-custom-software",
    eyebrow: "Service",
    title: "SaaS & Custom Software",
    intro:
      "Software shaped around the way your business actually works, from POS and ERP systems to multi-tenant SaaS platforms with subscriptions and role-based access.",
    highlights: ["POS & ERP", "Multi-tenant SaaS", "Role-based access", "Reporting"],
    sections: [
      {
        heading: "Solutions we've shipped",
        list: [
          "Restaurant POS with separate Admin, Kitchen, Cashier and Waiter roles",
          "ERP for travel agencies with 12 specialized panels and invoice automation",
          "Rental management platforms with availability tracking and bookings",
          "NFC smart-card platforms with profile provisioning",
          "AI-powered tools such as automated CV review",
        ],
      },
      {
        heading: "Built to scale",
        body: [
          "We design clean, modular architecture from day one so your software can grow with more users, more locations and new features without needing a rewrite. Data is backed up automatically and access is controlled by role.",
        ],
      },
      {
        heading: "What you get",
        list: [
          "Product strategy and feature prioritization for your MVP",
          "Admin dashboards with reports, exports to PDF and Excel",
          "Subscription billing and payment integration",
          "Documentation and training for your team",
        ],
      },
    ],
    cta: { title: "Replacing spreadsheets or old software?", text: "Let's talk about the workflows slowing your team down and how custom software can fix them." },
  },
  {
    slug: "api-system-integration",
    eyebrow: "Service",
    title: "API & System Integration",
    intro:
      "Connect the tools you already use so data flows automatically. We build and integrate APIs for payments, shipping, accounting, messaging and more.",
    highlights: ["REST & GraphQL", "Payments", "Webhooks", "Legacy migration"],
    sections: [
      {
        heading: "Common integrations",
        list: [
          "Payment gateways such as Stripe and local Japanese payment providers",
          "Shipping and logistics tracking",
          "Accounting and invoicing systems",
          "Email, SMS and WhatsApp notifications",
          "Google Workspace, maps and analytics",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Manual copy-and-paste between systems is slow and error-prone. Integrations remove repetitive work, keep data consistent everywhere and free your team to focus on customers.",
        ],
      },
      {
        heading: "Our approach",
        list: [
          "Secure authentication and encrypted data in transit",
          "Clear API documentation for your team or partners",
          "Monitoring and alerts when an external service fails",
          "Safe, step-by-step migration away from legacy systems",
        ],
      },
    ],
    cta: { title: "Systems not talking to each other?", text: "Tell us which tools you use and we'll suggest the simplest way to connect them." },
  },
  {
    slug: "devops-cloud-services",
    eyebrow: "Service",
    title: "DevOps & Cloud Services",
    intro:
      "Reliable hosting, automated deployments and monitoring so your applications stay fast, secure and online, without you having to think about servers.",
    highlights: ["AWS & GCP", "CI/CD", "Docker", "Monitoring"],
    sections: [
      {
        heading: "What we handle",
        list: [
          "Cloud setup on AWS, Google Cloud, Vercel or shared hosting",
          "Automated build and deployment pipelines",
          "Docker containers for consistent environments",
          "SSL certificates, domains and email configuration",
          "Daily backups and disaster recovery plans",
        ],
      },
      {
        heading: "Peace of mind",
        body: [
          "With automated deployments, every update goes live the same safe way, and if something goes wrong it can be rolled back in minutes. Uptime monitoring alerts us before your customers notice a problem.",
        ],
      },
      {
        heading: "Ongoing care plans",
        list: [
          "Security updates and dependency upgrades",
          "Performance tuning as traffic grows",
          "Monthly uptime and performance reports",
          "Priority support for urgent issues",
        ],
      },
    ],
    cta: { title: "Worried about downtime?", text: "We can review your current setup and recommend practical improvements." },
  },
];

/* ------------------------------------------------------------------ */
/* Legal                                                               */
/* ------------------------------------------------------------------ */

export const legalPages: InfoPage[] = [
  {
    slug: "privacy-policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: UPDATED,
    intro: `This policy explains what personal information ${COMPANY} collects through this website, why we collect it, and how we protect it. We handle personal information in line with Japan's Act on the Protection of Personal Information (APPI).`,
    sections: [
      {
        heading: "Information we collect",
        body: ["We only collect information you choose to give us, plus a small amount of technical data needed to run the site securely."],
        list: [
          "Contact form: your name, email address, subject and message",
          "Technical data: your IP address and browser type when you submit the form, used to prevent spam",
          "WhatsApp, email or phone: any details you share when you contact us directly",
        ],
      },
      {
        heading: "How we use your information",
        list: [
          "To reply to your enquiry and provide quotes or proposals",
          "To deliver and support services you have engaged us for",
          "To protect the website from spam and abuse",
        ],
        body: ["We do not sell, rent or trade your personal information, and we do not use it for advertising."],
      },
      {
        heading: "Storage and security",
        body: [
          "Contact form messages are stored in a secure, access-controlled database that only authorized OOLLN staff can view. Data is encrypted in transit using HTTPS. We keep enquiries for up to two years unless they lead to an ongoing business relationship, after which they are deleted.",
        ],
      },
      {
        heading: "Third-party services",
        body: ["Some features rely on trusted third parties, which process data under their own privacy policies:"],
        list: [
          "WhatsApp (Meta) when you choose to chat with us",
          "Google Fonts for typography on this website",
          "Our cloud hosting and database providers",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You may request access to, correction of, or deletion of the personal information we hold about you at any time by emailing ${CONTACT_EMAIL}. We will respond within 14 days.`,
        ],
      },
      {
        heading: "Contact",
        body: [`${COMPANY}, ${ADDRESS}. Email: ${CONTACT_EMAIL}. Phone: ${CONTACT_PHONE_DISPLAY}.`],
      },
    ],
  },
  {
    slug: "terms-of-service",
    eyebrow: "Legal",
    title: "Terms of Service",
    updated: UPDATED,
    intro: `These terms govern your use of the ${COMPANY} website and set out the general conditions under which we provide our services. By using this site you agree to them.`,
    sections: [
      {
        heading: "Use of this website",
        body: [
          "You may browse this website for personal and business information purposes. You agree not to misuse it, including attempting to gain unauthorized access, sending spam through the contact form, or interfering with its normal operation.",
        ],
      },
      {
        heading: "Our services",
        body: [
          "Each project is covered by a separate written proposal or agreement that describes the scope, timeline, fees and deliverables. If anything in that agreement differs from these terms, the project agreement takes priority.",
        ],
      },
      {
        heading: "Payments",
        list: [
          "Projects typically require a deposit before work begins",
          "Remaining payments are tied to agreed milestones",
          "Invoices are payable within 14 days unless otherwise agreed",
          "Ongoing maintenance and hosting are billed monthly or annually",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "Once a project is paid in full, you own the custom code and designs created specifically for you. We may reuse general-purpose tools and libraries, and we may show the finished work in our portfolio unless you ask us not to.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          `The information on this website is provided for general purposes. ${COMPANY} is not liable for indirect or consequential losses arising from its use. Our total liability for any project is limited to the fees paid for that project.`,
        ],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of Japan. Any disputes will be handled by the courts with jurisdiction over Chiba Prefecture."],
      },
    ],
  },
  {
    slug: "cookie-policy",
    eyebrow: "Legal",
    title: "Cookie Policy",
    updated: UPDATED,
    intro:
      "We keep cookies and browser storage to a minimum. This website does not use advertising or cross-site tracking cookies. Here is exactly what is stored and why.",
    sections: [
      {
        heading: "What we store",
        list: [
          "Theme preference (browser local storage): remembers whether you chose light or dark mode",
          "WhatsApp greeting (browser session storage): remembers that you closed the chat bubble, cleared when you close the tab",
          "Admin session cookie: used only by OOLLN staff when signed in to the admin panel",
        ],
      },
      {
        heading: "Third-party cookies",
        body: [
          "When you click the WhatsApp button you are taken to WhatsApp, which may set its own cookies under Meta's policies. Fonts are loaded from Google Fonts, which may log your IP address for security purposes.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can clear or block cookies and site data at any time in your browser settings. The website will still work; it simply won't remember your theme choice.",
        ],
      },
      {
        heading: "Questions",
        body: [`If you have any questions about this policy, email us at ${CONTACT_EMAIL}.`],
      },
    ],
  },
];

export const findServicePage = (slug: string) => servicePages.find((page) => page.slug === slug);
export const findLegalPage = (slug: string) => legalPages.find((page) => page.slug === slug);
