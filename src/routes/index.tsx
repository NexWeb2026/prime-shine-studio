import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CalendarCheck, Star, Award, Clock3, ShieldCheck } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prime Shine & Repair — Luxury Car Detailing & Repair" },
      {
        name: "description",
        content:
          "Premium car care: detailing, paint correction, ceramic coating, dent and scratch repair. Book your service today.",
      },
      { property: "og:title", content: "Prime Shine & Repair — Luxury Car Care" },
      {
        property: "og:description",
        content: "Detailing, repairs, protection & precision work — all in one place.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const stats = [
  { Icon: Award, label: "Cars Serviced", to: 4200, suffix: "+" },
  { Icon: Clock3, label: "Years Experience", to: 12, suffix: "" },
  { Icon: Star, label: "Customer Satisfaction", to: 99, suffix: "%" },
  { Icon: ShieldCheck, label: "Same-Day Availability", to: 24, suffix: "/7" },
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative -mt-20 min-h-[100vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src={heroCar}
            alt="Luxury black sports car under premium gold lighting in Prime Shine & Repair detailing studio"
            width={1920}
            height={1280}
            className="h-full w-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-center px-6 pt-28 pb-32 lg:px-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Luxury Auto Care · Est. 2013
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl lg:text-[5.5rem]"
          >
            Premium Car Care{" "}
            <span className="text-gradient-gold">& Repair</span>{" "}
            Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Detailing, repairs, protection & precision work — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/bookings"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover-gold-glow"
            >
              <CalendarCheck className="h-4 w-4" /> Book a Service
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              View Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating stats cards */}
        <div className="relative z-10 -mt-16 px-6 pb-20 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                className="glass rounded-2xl p-5 hover-gold-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg glass-gold text-primary">
                    <s.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <Counter to={s.to} suffix={s.suffix} />
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          eyebrow="Our Services"
          title={<>Engineered for <span className="text-gradient-gold">every detail</span></>}
          description="A complete spectrum of luxury automotive care — from showroom-grade detailing to precision body and glass repair."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Ready for the <span className="text-gradient-gold">Prime Shine</span> finish?
              </h3>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Same-day appointments available. Walk-ins welcome based on availability.
              </p>
            </div>
            <Link
              to="/bookings"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover-gold-glow"
            >
              Book Your Slot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
