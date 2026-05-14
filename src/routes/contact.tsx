import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Instagram, Facebook, Twitter, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Prime Shine & Repair" },
      {
        name: "description",
        content: "Get in touch with Prime Shine & Repair — call, WhatsApp, email or visit our studio.",
      },
      { property: "og:title", content: "Contact Prime Shine & Repair" },
      { property: "og:description", content: "Reach our team — we respond in under an hour." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  message: z.string().trim().min(5, "Tell us a bit more").max(800),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const next: Record<string, string> = {};
      for (const i of r.error.issues) next[i.path[0] as string] = i.message;
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent — we'll be in touch shortly!");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Contact"
        title={<>Let's get your <span className="text-gradient-gold">car looking right</span></>}
        description="Call, message or stop by the studio — we typically respond in under an hour."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={submit}
          className="rounded-3xl border border-border bg-card p-8 md:p-10"
        >
          <div className="grid gap-5">
            <Field label="Your name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
                placeholder="you@email.com"
              />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} resize-none`}
                placeholder="How can we help?"
              />
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send Message
            </button>
          </div>
        </motion.form>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard Icon={Phone} title="Call us" sub="+1 (555) 010-1234" href="tel:+15550101234" />
            <ContactCard
              Icon={MessageCircle}
              title="WhatsApp"
              sub="Quick replies"
              href="https://wa.me/15550101234"
            />
            <ContactCard Icon={Mail} title="Email" sub="hello@primeshine.co" href="mailto:hello@primeshine.co" />
            <ContactCard Icon={MapPin} title="Visit" sub="14 Atelier Drive, Studio Bay" href="#map" />
          </div>

          <div className="rounded-3xl border border-border bg-card p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg glass-gold text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <h4 className="font-display text-lg font-semibold">Business hours</h4>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Mon – Fri</span><span className="text-foreground">8:00 — 19:00</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-foreground">9:00 — 18:00</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-foreground">By appointment</span></li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Follow us</p>
            <div className="mt-4 flex gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Twitter, href: "https://twitter.com" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="social link"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground/80 transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="map" className="mt-12 overflow-hidden rounded-3xl border border-border">
        <iframe
          title="Studio location"
          src="https://www.google.com/maps?q=Empire+State+Building&output=embed"
          width="100%"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full"
        />
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
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

function ContactCard({
  Icon,
  title,
  sub,
  href,
}: {
  Icon: typeof Phone;
  title: string;
  sub: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="block rounded-2xl border border-border bg-card p-5 transition hover-gold-glow"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg glass-gold text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <p className="mt-1 font-semibold">{sub}</p>
    </a>
  );
}
