import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Heart, ShieldCheck, Wrench } from "lucide-react";
import about from "@/assets/about-team.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prime Shine & Repair" },
      {
        name: "description",
        content:
          "A studio built on craftsmanship and obsession with detail. Meet the team behind Prime Shine & Repair.",
      },
      { property: "og:title", content: "About Prime Shine & Repair" },
      { property: "og:description", content: "Craftsmanship, trust and the obsession with detail." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  { Icon: Award, title: "Craftsmanship", text: "Every panel, every stitch — finished by hand." },
  { Icon: Wrench, title: "Precision", text: "Dealership-grade tools and certified technicians." },
  { Icon: ShieldCheck, title: "Trust", text: "Transparent quotes, photo-documented work." },
  { Icon: Heart, title: "Customer-first", text: "Concierge service, same-day where possible." },
];

const team = [
  { name: "Marcus Vale", role: "Founder & Master Detailer" },
  { name: "Elena Cruz", role: "Head of Paint Correction" },
  { name: "Javier Ortiz", role: "Body & Repair Lead" },
  { name: "Anna Lin", role: "Client Concierge" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Our Story"
        title={<>Built on craft. <span className="text-gradient-gold">Driven by detail.</span></>}
        description="Prime Shine & Repair was born from a simple belief: every car deserves the standard of a brand-new showroom delivery, every single time."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border"
        >
          <img src={about} alt="Prime Shine & Repair team working on luxury cars" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </motion.div>
        <div>
          <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
            A studio shaped by <span className="text-gradient-gold">obsession</span>
          </h3>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            For over a decade we've cared for daily drivers, weekend exotics, and full restoration projects. Our team blends old-school craftsmanship with modern automotive science — ceramic chemistry, paint metrology, paintless dent repair — so your vehicle leaves better than when it arrived.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {[
              { to: 4200, suffix: "+", label: "Cars restored" },
              { to: 99, suffix: "%", label: "Satisfaction rate" },
              { to: 12, suffix: "", label: "Years experience" },
              { to: 8, suffix: "", label: "Specialist services" },
            ].map((s) => (
              <div key={s.label}>
                <Counter to={s.to} suffix={s.suffix} />
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-7 hover-gold-glow"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl glass-gold text-primary">
              <p.Icon className="h-5 w-5" />
            </span>
            <h4 className="mt-5 font-display text-lg font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="The Team" title={<>Specialists, <span className="text-gradient-gold">not generalists</span></>} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 text-center hover-gold-glow"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary/40 to-[oklch(0.3_0.05_70)] grid place-items-center font-display text-2xl font-bold text-primary-foreground">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="mt-4 font-semibold">{m.name}</p>
              <p className="text-xs uppercase tracking-widest text-primary">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link
          to="/bookings"
          className="inline-flex rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover-gold-glow"
        >
          Work with our team
        </Link>
      </div>
    </div>
  );
}
