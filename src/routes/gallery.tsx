import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import paint from "@/assets/g-paint.jpg";
import interior from "@/assets/g-interior.jpg";
import headlight from "@/assets/g-headlight.jpg";
import ceramic from "@/assets/g-ceramic.jpg";
import dent from "@/assets/g-dent.jpg";
import bumper from "@/assets/g-bumper.jpg";
import wheel from "@/assets/g-wheel.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Prime Shine & Repair" },
      {
        name: "description",
        content: "Before and after transformations: detailing, paint, interior, glass and repairs.",
      },
      { property: "og:title", content: "Gallery — Prime Shine & Repair" },
      { property: "og:description", content: "See real transformations from our studio." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

type Item = { src: string; cat: Category; title: string };
type Category = "All" | "Detailing" | "Repairs" | "Interior" | "Paint" | "Glass";

const items: Item[] = [
  { src: paint, cat: "Paint", title: "Paint correction — black coupe" },
  { src: interior, cat: "Interior", title: "Interior deep clean" },
  { src: headlight, cat: "Glass", title: "Headlight restoration" },
  { src: ceramic, cat: "Detailing", title: "Ceramic protection finish" },
  { src: dent, cat: "Repairs", title: "Paintless dent removal" },
  { src: bumper, cat: "Repairs", title: "Bumper restoration" },
  { src: wheel, cat: "Detailing", title: "Wheel & caliper detail" },
  { src: paint, cat: "Paint", title: "Showroom polish" },
];

const categories: Category[] = ["All", "Detailing", "Repairs", "Interior", "Paint", "Glass"];

function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<Item | null>(null);
  const filtered = active === "All" ? items : items.filter((i) => i.cat === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Gallery"
        title={<>Real cars. <span className="text-gradient-gold">Real transformations.</span></>}
        description="A curated look at recent work from our studio bays."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              active === c
                ? "bg-primary text-primary-foreground shadow-gold"
                : "border border-border text-foreground/80 hover:border-primary hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
      >
        {filtered.map((it, i) => (
          <motion.button
            layout
            key={it.title + i}
            onClick={() => setOpen(it)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left"
          >
            <img
              src={it.src}
              alt={it.title}
              loading="lazy"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-xs uppercase tracking-widest text-primary">{it.cat}</span>
              <p className="mt-1 font-semibold">{it.title}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-border"
            >
              <img src={open.src} alt={open.title} className="max-h-[90vh] w-full object-contain" />
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-5">
                <span className="text-xs uppercase tracking-widest text-primary">{open.cat}</span>
                <p className="mt-1 font-semibold">{open.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
