import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Prime Shine & Repair" },
      {
        name: "description",
        content: "Real reviews from owners of luxury, exotic and daily-driven vehicles.",
      },
      { property: "og:title", content: "Testimonials — Prime Shine & Repair" },
      { property: "og:description", content: "Loved by drivers across the city." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

const reviews = [
  {
    name: "Daniel R.",
    car: "Porsche 911",
    rating: 5,
    text: "Best detail my 911 has ever had. The paint correction made it look better than the day I bought it.",
  },
  {
    name: "Priya S.",
    car: "Range Rover Sport",
    rating: 5,
    text: "They restored a deep scratch I thought was permanent. Same-day service, gorgeous result.",
  },
  {
    name: "Marco T.",
    car: "BMW M4",
    rating: 5,
    text: "The ceramic coating package is unreal — water sheets right off and the gloss is showroom level.",
  },
  {
    name: "Aisha K.",
    car: "Mercedes EQS",
    rating: 5,
    text: "Interior deep clean removed every trace of two kids and a dog. Felt brand new.",
  },
  {
    name: "Liam O.",
    car: "Audi RS6",
    rating: 5,
    text: "Bumper repair was flawless — color match was perfect. Highly recommended.",
  },
];

const stats = [
  { to: 92, suffix: "%", label: "Repeat customers" },
  { to: 99, suffix: "%", label: "Satisfaction" },
  { to: 4200, suffix: "+", label: "Cars restored" },
  { to: 1800, suffix: "+", label: "5-star reviews" },
];

function TestimonialsPage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Loved by Drivers"
        title={<>Words from <span className="text-gradient-gold">our clients</span></>}
        description="Trusted by daily commuters, weekend warriors and exotic owners alike."
      />

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14">
          <Quote className="absolute right-8 top-8 h-16 w-16 text-primary/15" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-1">
                {Array.from({ length: reviews[i].rating }).map((_, k) => (
                  <Star key={k} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
                "{reviews[i].text}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary/50 to-[oklch(0.3_0.05_70)] font-display font-bold text-primary-foreground">
                  {reviews[i].name[0]}
                </div>
                <div>
                  <p className="font-semibold">{reviews[i].name}</p>
                  <p className="text-xs uppercase tracking-widest text-primary">{reviews[i].car}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            aria-label="Previous"
            onClick={() => setI((p) => (p - 1 + reviews.length) % reviews.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, k) => (
              <button
                key={k}
                aria-label={`Go to review ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={() => setI((p) => (p + 1) % reviews.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-6 text-center hover-gold-glow"
          >
            <Counter to={s.to} suffix={s.suffix} />
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
