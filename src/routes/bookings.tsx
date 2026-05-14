import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarCheck, Check, Clock, Phone, ShieldAlert, Loader2 } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeading } from "@/components/site/SectionHeading";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/bookings")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Bookings — Prime Shine & Repair" },
      {
        name: "description",
        content:
          "Reserve your premium detailing or repair service. Same-day availability and walk-ins welcome.",
      },
      { property: "og:title", content: "Book a Service — Prime Shine & Repair" },
      { property: "og:description", content: "Schedule your premium car care appointment." },
      { property: "og:url", content: "/bookings" },
    ],
    links: [{ rel: "canonical", href: "/bookings" }],
  }),
  component: BookingsPage,
});

const vehicleTypes = ["Sedan", "Coupe / Sports", "SUV / Crossover", "Truck", "EV", "Exotic"];
const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

const formSchema = z.object({
  service: z.string().min(1, "Please choose a service"),
  vehicle: z.string().min(1, "Please choose a vehicle type"),
  date: z.string().min(1, "Please choose a date"),
  time: z.string().min(1, "Please choose a time slot"),
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone").max(24),
  notes: z.string().max(600).optional(),
});

function BookingsPage() {
  const search = Route.useSearch();
  const [form, setForm] = useState({
    service: search.service ?? "",
    vehicle: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        next[issue.path[0] as string] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setDone(true);
    toast.success("Booking received — we'll confirm shortly!");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Schedule a Visit"
        title={<>Reserve your <span className="text-gradient-gold">studio slot</span></>}
        description="Tell us about your vehicle and pick a time that works. We'll confirm by phone or email within an hour."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-7 md:p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid place-items-center py-14 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-gold"
                >
                  <Check className="h-10 w-10" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold md:text-3xl">
                  Booking received!
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  A specialist will reach out shortly to confirm your <strong className="text-primary">{form.service.replace(/-/g, " ")}</strong> on{" "}
                  <strong className="text-primary">{form.date}</strong> at{" "}
                  <strong className="text-primary">{form.time}</strong>.
                </p>
                <button
                  onClick={() => {
                    setDone(false);
                    setForm({ service: "", vehicle: "", date: "", time: "", name: "", email: "", phone: "", notes: "" });
                  }}
                  className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Make another booking
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={submit}
                className="grid gap-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Service" error={errors.service}>
                    <select
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Choose a service…</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Vehicle type" error={errors.vehicle}>
                    <select
                      value={form.vehicle}
                      onChange={(e) => set("vehicle", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Select vehicle…</option>
                      {vehicleTypes.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Preferred date" error={errors.date}>
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Time slot" error={errors.time}>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set("time", t)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                            form.time === t
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-foreground/80 hover:border-primary/60"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" error={errors.name}>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Doe"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+1 (555) 123 4567"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@email.com"
                    className={inputCls}
                  />
                </Field>

                <Field label="Special requests / notes" error={errors.notes}>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={4}
                    placeholder="Anything we should know about your vehicle…"
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="h-4 w-4" /> Confirm Booking
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-border bg-card p-7">
            <span className="grid h-10 w-10 place-items-center rounded-lg glass-gold text-primary">
              <Clock className="h-5 w-5" />
            </span>
            <h4 className="mt-4 font-display text-lg font-semibold">Operating hours</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Mon – Fri</span><span className="text-foreground">8:00 — 19:00</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-foreground">9:00 — 18:00</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-foreground">By appointment</span></li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Estimated response time: <span className="text-primary">under 1 hour</span>.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7">
            <span className="grid h-10 w-10 place-items-center rounded-lg glass-gold text-primary">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <h4 className="mt-4 font-display text-lg font-semibold">Booking policy</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Walk-ins are welcome based on availability. Scheduled bookings receive priority service to ensure minimal waiting time and guaranteed attention.
            </p>
            <h5 className="mt-5 text-sm font-semibold text-foreground">Cancellation</h5>
            <p className="mt-1 text-sm text-muted-foreground">
              Free up to 12 hours before your slot. Late cancellations may incur a 15% fee.
            </p>
          </div>

          <a
            href="tel:+15550101234"
            className="flex items-center gap-3 rounded-3xl border border-border bg-card p-7 transition hover-gold-glow"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg glass-gold text-primary">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Call us</p>
              <p className="font-semibold">+1 (555) 010-1234</p>
            </div>
          </a>
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
