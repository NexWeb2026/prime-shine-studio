import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Prime Shine & Repair" },
      {
        name: "description",
        content:
          "Detailing, paint correction, ceramic protection, dent and scratch repair, glass replacement and more.",
      },
      { property: "og:title", content: "Services — Prime Shine & Repair" },
      { property: "og:description", content: "Premium services for every detail of your vehicle." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const inclusions = [
  "Pre-service multi-point inspection",
  "Pet-safe, eco-conscious products",
  "Climate-controlled detail bays",
  "Documented before / after gallery",
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Full Service Catalog"
        title={<>Crafted by hand. <span className="text-gradient-gold">Backed by precision.</span></>}
        description="Every service is performed by certified specialists using premium products and dealership-grade equipment."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i} />
        ))}
      </div>

      <div className="mt-20 grid gap-6 rounded-3xl border border-border bg-card p-10 md:grid-cols-2 md:p-14">
        <div>
          <h3 className="font-display text-2xl font-bold md:text-3xl">
            Every service includes
          </h3>
          <p className="mt-3 text-muted-foreground">
            We treat each vehicle like it's the only one in the bay — meticulous, transparent, and finished to a brand-new standard.
          </p>
        </div>
        <ul className="grid gap-3 self-center">
          {inclusions.map((i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full glass-gold text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm text-foreground/90">{i}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/bookings"
          className="inline-flex rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover-gold-glow"
        >
          Book a Service
        </Link>
      </div>
    </div>
  );
}
