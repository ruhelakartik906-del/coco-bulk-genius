import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Gauge,
  Leaf,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import smartWhiteAsset from "@/assets/coco-smart-white.webp.asset.json";
import smartLightAsset from "@/assets/coco-smart-light-wood.webp.asset.json";
import smartDarkAsset from "@/assets/coco-smart-dark-wood.webp.asset.json";
import circularAsset from "@/assets/coco-circular.webp.asset.json";
import desktopAsset from "@/assets/coco-desktop.webp.asset.json";

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  company: z.string().trim().min(2, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Required").max(20),
  city: z.string().trim().min(2, "Required").max(80),
  country: z.string().trim().min(2, "Required").max(80),
  model: z.string().trim().min(1, "Required"),
  quantity: z.string().trim().min(1, "Required"),
  industry: z.string().trim().min(1, "Required"),
  timeline: z.string().trim().min(1, "Required"),
  details: z.string().trim().max(1000).optional(),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const products = [
  {
    id: "smart-white",
    name: "SMART Air Purifier",
    variant: "Snow White",
    image: smartWhiteAsset.url,
    mrp: "₹24,999",
    from: "₹16,249",
    save: "35%",
    tiers: [
      { qty: "1 Unit", price: "₹22,499" },
      { qty: "50 Units", price: "₹19,999" },
      { qty: "100 Units", price: "₹17,999" },
      { qty: "500 Units", price: "₹16,249" },
    ],
  },
  {
    id: "smart-light",
    name: "SMART Air Purifier",
    variant: "Light Oak",
    image: smartLightAsset.url,
    mrp: "₹26,999",
    from: "₹16,739",
    save: "38%",
    tiers: [
      { qty: "1 Unit", price: "₹24,299" },
      { qty: "50 Units", price: "₹21,599" },
      { qty: "100 Units", price: "₹19,439" },
      { qty: "500 Units", price: "₹16,739" },
    ],
  },
  {
    id: "smart-dark",
    name: "SMART Air Purifier",
    variant: "Dark Walnut",
    image: smartDarkAsset.url,
    mrp: "₹26,999",
    from: "₹16,739",
    save: "38%",
    tiers: [
      { qty: "1 Unit", price: "₹24,299" },
      { qty: "50 Units", price: "₹21,599" },
      { qty: "100 Units", price: "₹19,439" },
      { qty: "500 Units", price: "₹16,739" },
    ],
  },
  {
    id: "circular",
    name: "Circular Air Purifier",
    variant: "Classic White",
    image: circularAsset.url,
    mrp: "₹18,999",
    from: "₹11,399",
    save: "40%",
    tiers: [
      { qty: "1 Unit", price: "₹16,999" },
      { qty: "50 Units", price: "₹14,999" },
      { qty: "100 Units", price: "₹13,299" },
      { qty: "500 Units", price: "₹11,399" },
    ],
  },
  {
    id: "desktop",
    name: "Desktop Air Purifier",
    variant: "Compact White",
    image: desktopAsset.url,
    mrp: "₹9,999",
    from: "₹5,499",
    save: "45%",
    tiers: [
      { qty: "1 Unit", price: "₹8,999" },
      { qty: "50 Units", price: "₹7,499" },
      { qty: "100 Units", price: "₹6,499" },
      { qty: "500 Units", price: "₹5,499" },
    ],
  },
];

const stats = [
  { value: "Up to 60%", label: "Volume Savings" },
  { value: "500+", label: "Units Per Order" },
  { value: "Pan India", label: "Delivery Network" },
  { value: "24 Hrs", label: "Quote Response" },
];

const features = [
  { icon: ShieldCheck, label: "HEPA H13" },
  { icon: Sparkles, label: "UV Sterilization" },
  { icon: Leaf, label: "Energy Efficient" },
  { icon: Wind, label: "Smart Airflow" },
  { icon: Gauge, label: "Real-Time AQI" },
  { icon: Cpu, label: "AI Purification" },
];

const industries = [
  "Corporate Offices",
  "Hospitals & Clinics",
  "Retail Stores",
  "Factories",
  "Hotels & Resorts",
  "Restaurants",
  "Schools & Colleges",
  "Co-working Spaces",
];

const process = [
  { icon: Phone, title: "Share Requirement", desc: "Tell us models, quantity and timeline." },
  { icon: Package, title: "Custom Quote", desc: "Receive tailored volume pricing within 24 hours." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Dispatched ex-works Ahmedabad with tracked logistics." },
];

const infoRows: Array<[string, string]> = [
  ["Dispatch", "Ex-Works Ahmedabad"],
  ["Logistics", "Pan India delivery"],
  ["Warranty", "2 Years"],
  ["Support", "Dedicated Account Manager"],
  ["Email", "hello@coco.in"],
  ["Phone", "+91 90000 00000"],
];

const industryOptions = [
  "Corporate Office",
  "Hospital / Clinic",
  "Hotel / Resort",
  "Retail",
  "Factory / Industrial",
  "Education",
  "Restaurant",
  "Co-working",
  "Other",
];

const timelineOptions = [
  "Within 1 week",
  "1–2 weeks",
  "2–4 weeks",
  "1–3 months",
  "Flexible",
];

export function CocoBulkOrdersPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(5);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const modelOptions = useMemo(
    () => products.map((p) => `${p.name} — ${p.variant}`),
    [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
  });

  useEffect(() => {
    if (!submitted) return;
    if (count <= 0) {
      navigate({ to: "/" });
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [submitted, count, navigate]);

  const onSubmit = async (_values: EnquiryValues) => {
    await new Promise((r) => setTimeout(r, 800));
    reset();
    setCount(5);
    setSubmitted(true);
  };

  const pickModel = (label: string) => {
    setSelectedModel(label);
    setValue("model", label, { shouldValidate: true });
    const form = document.getElementById("enquiry");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-dvh bg-[#F6F3EE] text-[#1c1a17]">
      {/* Top nav bar */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#F6F3EE]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2">
            <span
              className="text-lg tracking-tight"
              style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
            >
              COCO
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[#8a8275] sm:inline">
              / Bulk Orders
            </span>
          </div>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 rounded-full bg-[#1c1a17] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
          >
            Get Quote <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        {/* HERO */}
        <section className="pb-16 pt-14 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8275]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                B2B · Volume Orders
              </span>
              <h1
                className="mt-6 text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-[68px]"
                style={{ fontWeight: 600, letterSpacing: "-0.03em" }}
              >
                Premium air, <br className="hidden sm:block" />
                supplied at scale.
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#5b5650] sm:text-base">
                Equip offices, hotels, hospitals and institutions with certified
                COCO air purifiers. Volume pricing, dedicated account manager
                and fast delivery across India.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1c1a17] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-black"
                >
                  Request Quote <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1a17] transition hover:bg-black hover:text-white"
                >
                  View Pricing
                </a>
              </div>
            </div>

            {/* Hero product visual */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-[32px] bg-gradient-to-br from-[#EFEAE2] via-[#F6F3EE] to-[#E4DED3]">
                <img
                  src={smartWhiteAsset.url}
                  alt="COCO SMART Air Purifier"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17] shadow-sm backdrop-blur">
                  Bestseller
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-black/10 bg-white p-4 shadow-lg sm:block">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#8a8275]">Save up to</div>
                <div className="mt-1 text-3xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>60%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="grid grid-cols-2 gap-3 pb-20 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-black/10 bg-white px-5 py-6 sm:px-6 sm:py-7"
            >
              <div
                className="text-2xl tracking-tight sm:text-3xl"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-[#8a8275] sm:text-xs">
                {s.label}
              </div>
            </motion.div>
          ))}
        </section>

        {/* PRODUCTS */}
        <section id="products" className="pb-24">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
                The Range
              </p>
              <h2
                className="mt-3 text-3xl tracking-tight sm:text-5xl"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Choose your model
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#5b5650]">
              Five premium models. Volume-tier pricing on every unit — the more
              you order, the more you save.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEAE2]">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.variant}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#1c1a17] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Save {p.save}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-[#8a8275]">
                        {p.variant}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8a8275]">
                        From
                      </div>
                      <div
                        className="text-lg tracking-tight"
                        style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                      >
                        {p.from}
                      </div>
                      <div className="text-[11px] text-[#8a8275] line-through">
                        {p.mrp}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-[#F6F3EE] p-3">
                    {p.tiers.map((t) => (
                      <div key={t.qty} className="rounded-xl bg-white px-3 py-2">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#8a8275]">
                          {t.qty}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold">
                          {t.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => pickModel(`${p.name} — ${p.variant}`)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1c1a17] transition hover:bg-[#1c1a17] hover:text-white"
                  >
                    Enquire — {p.variant.split(" ")[0]}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="pb-24">
          <div className="rounded-[32px] bg-[#1c1a17] p-8 text-white sm:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              How it works
            </p>
            <h2
              className="mt-3 max-w-2xl text-3xl tracking-tight sm:text-5xl"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              A simple 3-step process.
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {process.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <step.icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.22em] text-white/50">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="pb-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
            Performance
          </p>
          <h2
            className="mx-auto mt-4 max-w-3xl text-3xl tracking-tight sm:text-5xl"
            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Engineered for every space.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#5b5650]">
            Medical-grade HEPA H13 filtration combined with intelligent sensors.
            Trusted across India for reliable, silent operation.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/10 bg-white">
                  <f.icon className="h-7 w-7 text-[#1c1a17]" strokeWidth={1.4} />
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#1c1a17]">
                  {f.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES + FORM */}
        <section id="enquiry" className="grid gap-10 pb-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
              Industries
            </p>
            <h2
              className="mt-4 text-4xl tracking-tight sm:text-5xl"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              For every professional space.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#5b5650]">
              Whether furnishing one floor or an entire building, we provide
              tailored air purification with consistent quality and reliable
              support.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {industries.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1c1a17] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
              {infoRows.map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex items-center justify-between px-5 py-4 text-sm ${
                    i === infoRows.length - 1 ? "" : "border-b border-black/5"
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8a8275]">
                    {k}
                  </span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="relative">
            <div className="sticky top-20 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
              <div className="border-b border-black/5 bg-[#1c1a17] px-8 py-7 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                  Enquiry
                </p>
                <h2
                  className="mt-2 text-3xl tracking-tight sm:text-4xl"
                  style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  Request a Quote
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  Reply within 1 business day · No obligation
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-8"
              >
                <div className="sm:col-span-2">
                  <SectionLabel>1. About you</SectionLabel>
                </div>
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input placeholder="Priya Sharma" className={inputCls} {...register("fullName")} />
                </Field>
                <Field label="Company" error={errors.company?.message}>
                  <input placeholder="Acme Corp" className={inputCls} {...register("company")} />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input type="email" placeholder="you@company.com" className={inputCls} {...register("email")} />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input placeholder="+91 90000 00000" className={inputCls} {...register("phone")} />
                </Field>
                <Field label="City" error={errors.city?.message}>
                  <input placeholder="Mumbai" className={inputCls} {...register("city")} />
                </Field>
                <Field label="Country" error={errors.country?.message}>
                  <input className={inputCls} defaultValue="India" {...register("country")} />
                </Field>

                <div className="mt-2 sm:col-span-2">
                  <SectionLabel>2. Your order</SectionLabel>
                </div>
                <Field label="Preferred Model" error={errors.model?.message}>
                  <select
                    className={inputCls}
                    value={selectedModel}
                    {...register("model", {
                      onChange: (e) => setSelectedModel(e.target.value),
                    })}
                  >
                    <option value="" disabled>
                      Select model
                    </option>
                    {modelOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Quantity" error={errors.quantity?.message}>
                  <input type="number" min={1} placeholder="e.g. 50" className={inputCls} {...register("quantity")} />
                </Field>
                <Field label="Industry" error={errors.industry?.message}>
                  <select className={inputCls} defaultValue="" {...register("industry")}>
                    <option value="" disabled>
                      Select industry
                    </option>
                    {industryOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Timeline" error={errors.timeline?.message}>
                  <select className={inputCls} defaultValue="" {...register("timeline")}>
                    <option value="" disabled>
                      Select timeline
                    </option>
                    {timelineOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Additional Details (optional)" error={errors.details?.message}>
                    <textarea
                      rows={4}
                      placeholder="Delivery location, customization, invoicing…"
                      className={`${inputCls} h-auto resize-y py-3`}
                      {...register("details")}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1c1a17] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-black disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : (<>Send Enquiry <ArrowRight className="h-4 w-4" /></>)}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-[#8a8275]">
                    By submitting, you agree to be contacted about your enquiry.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <span className="text-base tracking-tight" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
              COCO
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#8a8275]">
              Air Purifiers · Made in India
            </span>
          </div>
          <p className="text-xs text-[#8a8275]">
            © {new Date().getFullYear()} COCO. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Success popup */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-[#F6F3EE] p-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1c1a17] text-white">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3
                className="mt-6 text-3xl tracking-tight"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Quote Submitted
              </h3>
              <p className="mt-3 text-sm text-[#5b5650]">
                Thank you — our team will reach out shortly.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[#8a8275]">
                Redirecting to Home in
              </p>
              <div
                className="mt-2 text-5xl tabular-nums"
                style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {count}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-black/10 bg-[#F6F3EE] px-4 text-sm text-[#1c1a17] outline-none transition placeholder:text-[#a8a098] focus:border-[#1c1a17] focus:bg-white";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8275]">
        {children}
      </span>
      <span className="h-px flex-1 bg-black/10" />
    </div>
  );
}

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
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8275]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
