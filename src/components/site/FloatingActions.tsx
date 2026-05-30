import { Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";

// Floating action buttons for booking and mobile CTAs
export function FloatingActions() {
  return (
    <>
      <Link
        to="/bookings"
        aria-label="Book a service"
        className="fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover-gold-glow"
      >
        <CalendarCheck className="h-4 w-4" />
        Book a Service
      </Link>
      {/* Sticky mobile CTA */}
      <Link
        to="/bookings"
        className="md:hidden fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-gold"
        aria-label="Book a service"
      >
        <CalendarCheck className="h-6 w-6" />
      </Link>
    </>
  );
}
