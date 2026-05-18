import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/Prime Shine logo-Photoroom.png";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background">
      <div className="divider-gold" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-md">
                <img
                  src={logo}
                  alt="Prime Shine & Repair logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-lg font-bold">
                Prime <span className="text-gradient-gold">Shine</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Premium detailing, repairs and protection — engineered for cars you love.
            </p>
            <div className="mt-6 flex gap-3">
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
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 transition hover:text-primary hover:border-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Navigate</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Gallery", "/gallery"],
                ["About", "/about"],
                ["Testimonials", "/testimonials"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                "Premium Detailing",
                "Paint Correction",
                "Ceramic Protection",
                "Dent & Scratch Repair",
                "Window/Glass Repair",
                "Interior Restoration",
              ].map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition hover:text-primary">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>14 Atelier Drive, Studio Bay</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <a href="tel:+27824445656" className="hover:text-primary">
                  +27 82 444 5656
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <a href="mailto:hello@primeshine.co" className="hover:text-primary">
                  hello@primeshine.co
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <span>Mon–Sat · 8:00 — 19:00</span>
              </li>
            </ul>
            <Link
              to="/bookings"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover-gold-glow"
            >
              Book a Service
            </Link>
          </div>
        </div>

        <div className="divider-gold mt-14" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Prime Shine & Repair. Crafted with precision.
        </p>
      </div>
    </footer>
  );
}
