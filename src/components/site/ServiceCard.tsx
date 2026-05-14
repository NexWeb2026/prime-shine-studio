import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { Icon } = service;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 hover-gold-glow"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl glass-gold text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {service.duration}
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <Link
            to="/bookings"
            search={{ service: service.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 transition-all group-hover:scale-150 group-hover:bg-primary" />
        </div>
      </div>
    </motion.div>
  );
}
