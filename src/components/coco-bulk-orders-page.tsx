import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  Factory,
  Hotel,
  Hospital,
  Leaf,
  MonitorCog,
  School,
  Sparkles,
  Store,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import circularPurifierAsset from "@/assets/coco-circular-purifier.png.asset.json";
import desktopPurifierAsset from "@/assets/coco-desktop-purifier.png.asset.json";
import darkWoodPurifierAsset from "@/assets/coco-smart-dark-wood.png.asset.json";
import lightWoodPurifierAsset from "@/assets/coco-smart-light-wood.png.asset.json";
import whitePurifierAsset from "@/assets/coco-smart-white.png.asset.json";

type AssetPointer = { url: string };

const circularPurifier = circularPurifierAsset as AssetPointer;
const desktopPurifier = desktopPurifierAsset as AssetPointer;
const darkWoodPurifier = darkWoodPurifierAsset as AssetPointer;
const lightWoodPurifier = lightWoodPurifierAsset as AssetPointer;
const whitePurifier = whitePurifierAsset as AssetPointer;

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().min(2, "Please enter your company or organization").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?[0-9][0-9\s()-]{7,19})$/, "Please enter a valid phone number"),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  state: z.string().trim().min(2, "Please enter your state").max(80),
  country: z.string().trim().min(2, "Please enter your country").max(80),
  industry: z.string().trim().min(1, "Please select your industry"),
  product: z.string().trim().min(1, "Please select a product"),
  quantityRequired: z.coerce.number().int().gt(0, "Quantity must be greater than zero"),
  deliveryTimeline: z.string().trim().min(1, "Please select a delivery timeline"),
  additionalRequirements: z
    .string()
    .trim()
    .max(1000, "Please keep additional requirements under 1000 characters")
    .optional(),
  agreement: z.boolean().refine((value) => value, {
    message: "You must agree to be contacted regarding this enquiry",
  }),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: AssetPointer;
  alt: string;
  defaultQuantity: number;
};

const products: Product[] = [
  {
    id: "smart-white",
    name: "SMART Air Purifier",
    description: "Smart HEPA air purifier for homes and offices.",
    features: ["HEPA H13", "Smart AQI", "Wi‑Fi", "Low Noise", "Coverage up to 500 sq.ft."],
    image: whitePurifier,
    alt: "COCO SMART Air Purifier in white finish on a wooden table",
    defaultQuantity: 25,
  },
  {
    id: "smart-light-wood",
    name: "SMART Air Purifier · Light Wood",
    description: "Luxury wood finish with premium air purification.",
    features: ["HEPA H13", "Wood Finish", "Smart Display", "Premium Interior", "Coverage 500 sq.ft."],
    image: lightWoodPurifier,
    alt: "COCO SMART Air Purifier in light wood finish in a premium interior",
    defaultQuantity: 25,
  },
  {
    id: "smart-dark-wood",
    name: "SMART Air Purifier · Dark Wood",
    description: "Luxury dark wood edition.",
    features: ["HEPA H13", "Luxury Finish", "Smart Sensors", "Premium Build", "Coverage 500 sq.ft."],
    image: darkWoodPurifier,
    alt: "COCO SMART Air Purifier in dark wood finish in a premium interior",
    defaultQuantity: 25,
  },
  {
    id: "circular-air",
    name: "Circular Air Purifier",
    description: "360° airflow purifier for bedrooms and offices.",
    features: ["360° Air Intake", "HEPA Filter", "Ultra Quiet", "Portable"],
    image: circularPurifier,
    alt: "COCO circular air purifier on a wooden table",
    defaultQuantity: 20,
  },
  {
    id: "desktop-air",
    name: "Desktop Air Purifier",
    description: "Compact desktop purifier for personal workspaces.",
    features: ["Portable", "USB Powered", "Quiet Mode", "Office Desk"],
    image: desktopPurifier,
    alt: "COCO desktop air purifier near a window with books",
    defaultQuantity: 50,
  },
];

const stats = [
  { value: "Up to 60%", label: "Volume Savings" },
  { value: "500+", label: "Units Per Order" },
  { value: "Pan India", label: "Delivery Network" },
  { value: "24 Hours", label: "Average Quote Response" },
] as const;

const benefits = [
  { icon: Wind, label: "HEPA H13 Filtration" },
  { icon: Sparkles, label: "UV Sterilization" },
  { icon: Zap, label: "Energy Efficient" },
  { icon: Waves, label: "Smart Airflow" },
  { icon: MonitorCog, label: "Real-Time AQI Monitoring" },
  { icon: Leaf, label: "AI Air Purification" },
] as const;

const industries = [
  { icon: BriefcaseBusiness, label: "Corporate Offices" },
  { icon: Hotel, label: "Hotels & Resorts" },
  { icon: Hospital, label: "Hospitals & Clinics" },
  { icon: School, label: "Schools & Colleges" },
  { icon: Store, label: "Retail Stores" },
  { icon: Building2, label: "Restaurants" },
  { icon: Factory, label: "Factories" },
  { icon: Building2, label: "Co-working Spaces" },
  { icon: Building2, label: "Government Institutions" },
  { icon: Hospital, label: "Healthcare Facilities" },
] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{kicker}</p>
      <h2 className="mt-4 text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-destructive">{message}</p>;
}

function ProductCard({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onSelect,
}: {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onSelect: () => void;
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="panel panel-hover flex min-w-[82%] snap-start flex-col overflow-hidden sm:min-w-[64%] md:min-w-0"
    >
      <div className="relative aspect-[4/4] overflow-hidden bg-surface-strong/70 p-5">
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={product.image.url}
          alt={product.alt}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-3xl leading-none text-foreground">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label={`${product.name} features`}>
          {product.features.map((feature) => (
            <li key={feature} className="tag-chip">
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="inline-flex items-center rounded-full border border-border bg-surface p-1 shadow-[var(--shadow-soft)]">
            <button
              type="button"
              aria-label={`Decrease ${product.name} quantity`}
              onClick={onDecrease}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="min-w-12 px-2 text-center text-sm font-semibold text-foreground">{quantity}</div>
            <button
              type="button"
              aria-label={`Increase ${product.name} quantity`}
              onClick={onIncrease}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          <button type="button" onClick={onSelect} className="button-primary flex-1">
            Select Product
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function CocoBulkOrdersPage() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [highlightProductField, setHighlightProductField] = useState(false);
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(products.map((product) => [product.id, product.defaultQuantity])),
  );

  const productSectionRef = useRef<HTMLElement | null>(null);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const productFieldRef = useRef<HTMLSelectElement | null>(null);
  const highlightTimerRef = useRef<number | null>(null);

  const defaultValues = useMemo<EnquiryFormValues>(
    () => ({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "India",
      industry: "",
      product: "",
      quantityRequired: 50,
      deliveryTimeline: "Within 30 days",
      additionalRequirements: "",
      agreement: false,
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues,
  });

  const productRegister = register("product");

  useEffect(() => {
    if (!successOpen) return;

    setCountdown(5);

    const interval = window.setInterval(() => {
      setCountdown((current) => (current > 1 ? current - 1 : current));
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      navigate({ to: "/" });
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(redirectTimer);
    };
  }, [navigate, successOpen]);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleQuantityChange = (productId: string, direction: "up" | "down") => {
    setProductQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, current[productId] + (direction === "up" ? 1 : -1)),
    }));
  };

  const handleSelectProduct = (product: Product) => {
    const quantity = productQuantities[product.id];

    setValue("product", product.name, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    setValue("quantityRequired", quantity, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setHighlightProductField(true);
    scrollToSection(formSectionRef);

    window.setTimeout(() => {
      productFieldRef.current?.focus({ preventScroll: true });
    }, prefersReducedMotion ? 0 : 450);

    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }

    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightProductField(false);
    }, 2000);

    toast.success("Product Selected");
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSuccessOpen(true);
    reset(defaultValues);
  };

  return (
    <div className="bg-background text-foreground">
      <Link
        to="/"
        className="button-secondary fixed left-4 top-4 z-50 px-4 py-3 text-xs sm:left-6 sm:top-6 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <main>
        <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
          <div className="section-shell">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16"
            >
              <div>
                <motion.p variants={itemVariants} className="eyebrow">
                  Bulk Orders
                </motion.p>
                <motion.h1
                  variants={itemVariants}
                  className="mt-5 max-w-4xl text-5xl leading-[0.92] text-foreground sm:text-6xl lg:text-8xl"
                >
                  Bulk Supply for Businesses & Institutions
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
                >
                  Equip your office, hotel, clinic, school or commercial space with premium air purification
                  solutions at volume pricing.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => scrollToSection(formSectionRef)} className="button-primary">
                    Request Quote
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection(productSectionRef)}
                    className="button-secondary"
                  >
                    Browse Products
                  </button>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="panel relative overflow-hidden p-5 sm:p-7">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-strong/90 to-transparent" />
                <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <div className="panel bg-surface px-4 py-3 sm:max-w-52">
                    <p className="eyebrow">Trusted Turnaround</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Dedicated B2B support, curated recommendations and rapid quotes for project-scale
                      procurement.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-[var(--shadow-soft)]">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-success" />
                    Ready for volume orders
                  </div>
                </div>
                <div className="relative mt-5 aspect-[5/4] overflow-hidden rounded-[calc(var(--radius)-2px)] bg-surface-strong/70">
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    src={whitePurifier.url}
                    alt="COCO SMART Air Purifier in white finish"
                    className="h-full w-full object-contain p-6 sm:p-8"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="pb-14 lg:pb-20"
        >
          <div className="section-shell">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <motion.article key={stat.label} variants={itemVariants} className="panel panel-hover px-6 py-7">
                  <p className="text-3xl leading-none text-foreground sm:text-[2rem]">{stat.value}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={productSectionRef}
          id="products"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="pb-14 lg:pb-20"
        >
          <div className="section-shell">
            <SectionHeading
              kicker="Product Showcase"
              title="Choose the purifier that fits your space."
              description="A curated B2B collection for premium interiors, hospitality environments, healthcare settings and focused workspaces."
            />

            <motion.div
              variants={containerVariants}
              className="-mx-6 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-5"
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={productQuantities[product.id]}
                  onDecrease={() => handleQuantityChange(product.id, "down")}
                  onIncrease={() => handleQuantityChange(product.id, "up")}
                  onSelect={() => handleSelectProduct(product)}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="pb-14 lg:pb-20"
        >
          <div className="section-shell">
            <div className="rounded-[2rem] border border-border/80 bg-card/80 px-6 py-8 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:px-8 lg:px-10 lg:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="eyebrow justify-center">Why Choose COCO</p>
                <h2 className="mt-4 text-4xl leading-none text-foreground sm:text-5xl">Built for performance.</h2>
                <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                  Medical-grade filtration combined with premium design, low-noise airflow and dependable
                  deployment support for modern commercial spaces.
                </p>
              </div>

              <motion.div variants={containerVariants} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <motion.div
                      key={benefit.label}
                      variants={itemVariants}
                      className="panel panel-hover flex flex-col items-center gap-4 px-4 py-6 text-center"
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-surface-strong text-foreground shadow-[var(--shadow-soft)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {benefit.label}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="pb-24"
        >
          <div className="section-shell grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
            <motion.div variants={itemVariants} className="space-y-6">
              <SectionHeading
                kicker="Industries We Serve"
                title="Designed for the spaces where air quality matters most."
                description="From hospitality and healthcare to offices and education, COCO supports tailored procurement for demanding commercial environments."
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {industries.map((industry) => {
                  const Icon = industry.icon;

                  return (
                    <motion.article
                      key={industry.label}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      className="panel panel-hover flex items-center gap-3 px-4 py-4"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-strong text-foreground">
                        <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                      </div>
                      <p className="min-w-0 text-sm font-semibold text-foreground">{industry.label}</p>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>

            <motion.section
              ref={formSectionRef}
              variants={itemVariants}
              aria-labelledby="bulk-enquiry-heading"
              className="panel p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-8">
                <p className="eyebrow">Request a Quote</p>
                <h2 id="bulk-enquiry-heading" className="mt-4 text-4xl leading-none text-foreground sm:text-5xl">
                  Bulk Enquiry Form
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  Share your project details and our B2B team will contact you within the next 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="field-label">
                    Full Name *
                  </label>
                  <input id="fullName" aria-invalid={Boolean(errors.fullName)} className="field-luxe mt-2" {...register("fullName")} />
                  <ErrorText message={errors.fullName?.message} />
                </div>

                <div>
                  <label htmlFor="company" className="field-label">
                    Company / Organization *
                  </label>
                  <input id="company" aria-invalid={Boolean(errors.company)} className="field-luxe mt-2" {...register("company")} />
                  <ErrorText message={errors.company?.message} />
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email Address *
                  </label>
                  <input id="email" type="email" aria-invalid={Boolean(errors.email)} className="field-luxe mt-2" {...register("email")} />
                  <ErrorText message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="phone" className="field-label">
                    Phone Number *
                  </label>
                  <input id="phone" type="tel" aria-invalid={Boolean(errors.phone)} className="field-luxe mt-2" {...register("phone")} />
                  <ErrorText message={errors.phone?.message} />
                </div>

                <div>
                  <label htmlFor="city" className="field-label">
                    City *
                  </label>
                  <input id="city" aria-invalid={Boolean(errors.city)} className="field-luxe mt-2" {...register("city")} />
                  <ErrorText message={errors.city?.message} />
                </div>

                <div>
                  <label htmlFor="state" className="field-label">
                    State *
                  </label>
                  <input id="state" aria-invalid={Boolean(errors.state)} className="field-luxe mt-2" {...register("state")} />
                  <ErrorText message={errors.state?.message} />
                </div>

                <div>
                  <label htmlFor="country" className="field-label">
                    Country *
                  </label>
                  <input id="country" aria-invalid={Boolean(errors.country)} className="field-luxe mt-2" {...register("country")} />
                  <ErrorText message={errors.country?.message} />
                </div>

                <div>
                  <label htmlFor="industry" className="field-label">
                    Industry *
                  </label>
                  <select id="industry" aria-invalid={Boolean(errors.industry)} className="field-luxe mt-2 appearance-none" {...register("industry")}>
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry.label} value={industry.label}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.industry?.message} />
                </div>

                <div>
                  <label htmlFor="product" className="field-label">
                    Product *
                  </label>
                  <select
                    id="product"
                    name={productRegister.name}
                    onBlur={productRegister.onBlur}
                    onChange={productRegister.onChange}
                    ref={(element) => {
                      productFieldRef.current = element;
                      productRegister.ref(element);
                    }}
                    aria-invalid={Boolean(errors.product)}
                    className={`field-luxe mt-2 appearance-none transition-all ${highlightProductField ? "ring-2 ring-ring shadow-[var(--shadow-lift)]" : ""}`}
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.product?.message} />
                </div>

                <div>
                  <label htmlFor="quantityRequired" className="field-label">
                    Quantity Required *
                  </label>
                  <input
                    id="quantityRequired"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    aria-invalid={Boolean(errors.quantityRequired)}
                    className="field-luxe mt-2"
                    {...register("quantityRequired")}
                  />
                  <ErrorText message={errors.quantityRequired?.message} />
                </div>

                <div>
                  <label htmlFor="deliveryTimeline" className="field-label">
                    Delivery Timeline *
                  </label>
                  <select id="deliveryTimeline" aria-invalid={Boolean(errors.deliveryTimeline)} className="field-luxe mt-2 appearance-none" {...register("deliveryTimeline")}>
                    <option value="Within 7 days">Within 7 days</option>
                    <option value="Within 15 days">Within 15 days</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="Flexible timeline">Flexible timeline</option>
                  </select>
                  <ErrorText message={errors.deliveryTimeline?.message} />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="additionalRequirements" className="field-label">
                    Additional Requirements
                  </label>
                  <textarea
                    id="additionalRequirements"
                    rows={5}
                    aria-invalid={Boolean(errors.additionalRequirements)}
                    className="field-luxe mt-2 min-h-32 resize-y pt-4"
                    placeholder="Project scope, installation notes, custom branding, room sizes or any special requirements..."
                    {...register("additionalRequirements")}
                  />
                  <ErrorText message={errors.additionalRequirements?.message} />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-4 text-sm leading-6 text-muted-foreground shadow-[var(--shadow-soft)]">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      {...register("agreement")}
                    />
                    <span>I agree to be contacted regarding this enquiry.</span>
                  </label>
                  <ErrorText message={errors.agreement?.message} />
                </div>

                <div className="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary min-w-52 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Request Bulk Quote"}
                  </button>
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                    Your enquiry is reviewed by our dedicated B2B team for pricing, lead times and deployment
                    planning.
                  </p>
                </div>
              </form>
            </motion.section>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {successOpen ? (
          <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[70] bg-foreground/20 backdrop-blur-sm"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="panel fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 p-8 text-center sm:p-10"
                >
                  <div className="mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-surface-strong text-success shadow-[var(--shadow-soft)]">
                    <CircleCheckBig className="h-9 w-9" aria-hidden="true" />
                  </div>
                  <Dialog.Title className="mt-6 text-4xl leading-none text-foreground sm:text-5xl">
                    Quote Submitted Successfully 🎉
                  </Dialog.Title>
                  <Dialog.Description className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                    Thank you for your enquiry. Our B2B team will contact you within the next 24 hours.
                  </Dialog.Description>
                  <div className="mt-8 rounded-[1.5rem] border border-border bg-surface px-6 py-5 shadow-[var(--shadow-soft)]">
                    <p className="eyebrow justify-center">Redirecting to Home...</p>
                    <motion.p
                      key={countdown}
                      initial={{ opacity: 0.45, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-6xl leading-none text-foreground"
                      aria-live="polite"
                    >
                      {countdown}
                    </motion.p>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default CocoBulkOrdersPage;
