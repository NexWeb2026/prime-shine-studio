import {
  Sparkles,
  Sofa,
  Brush,
  Wrench,
  Shield,
  CarFront,
  GlassWater,
  Droplets,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  description: string;
  duration: string;
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "premium-detailing",
    name: "Premium Detailing",
    description: "Hand-finished exterior wash, decontamination and showroom shine.",
    duration: "3 – 5 hrs",
    Icon: Sparkles,
  },
  {
    slug: "interior-restoration",
    name: "Interior Restoration",
    description: "Deep cleaning, leather conditioning and odor neutralization.",
    duration: "2 – 4 hrs",
    Icon: Sofa,
  },
  {
    slug: "paint-correction",
    name: "Paint Correction",
    description: "Multi-stage machine polish to remove swirls and restore depth.",
    duration: "6 – 10 hrs",
    Icon: Brush,
  },
  {
    slug: "dent-scratch-repair",
    name: "Dent & Scratch Repair",
    description: "Paintless dent removal and precision scratch blending.",
    duration: "1 – 3 hrs",
    Icon: Wrench,
  },
  {
    slug: "bumper-repair",
    name: "Bumper Repair",
    description: "Crack, scuff and structural bumper restoration with color match.",
    duration: "4 – 8 hrs",
    Icon: CarFront,
  },
  {
    slug: "window-glass-repair",
    name: "Window / Glass Repair",
    description: "Chip, crack and full window replacement with OEM-grade glass.",
    duration: "1 – 2 hrs",
    Icon: GlassWater,
  },
  {
    slug: "ceramic-protection",
    name: "Ceramic Protection",
    description: "Long-life ceramic coating with hydrophobic gloss finish.",
    duration: "1 – 2 days",
    Icon: Shield,
  },
  {
    slug: "engine-bay-cleaning",
    name: "Engine Bay Cleaning",
    description: "Safe degreasing, dressing and detail of the entire engine bay.",
    duration: "1 – 2 hrs",
    Icon: Droplets,
  },
];
