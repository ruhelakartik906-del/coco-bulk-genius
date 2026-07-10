import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Check,
  Cpu,
  Gauge,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import cocoLogo from "@/assets/coco-logo.avif.asset.json";
import heroPurifier from "@/assets/coco-smart-white.png.asset.json";
import smartLightWood from "@/assets/coco-smart-light-wood.png.asset.json";
import smartDarkWood from "@/assets/coco-smart-dark-wood.png.asset.json";
import circularPurifier from "@/assets/coco-air-purifier-hero.webp.asset.json";

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

const stats = [
  { value: "60%", label: "Volume Savings", sub: "on 500+ orders" },
  { value: "500+", label: "Units / Order", sub: "flexible MOQs" },
  { value: "PAN India", label: "Delivery", sub: "ex-Ahmedabad" },
  { value: "24 Hrs", label: "Quote Response", sub: "dedicated manager" },
];

const pricingRows = [
  { no: "01", model: "SMART Purifier", colour: "White", mrp: "₹24,999", discount: "35%", p1: "₹22,499", p50: "₹19,999", p100: "₹17,999", p500: "₹16,249", img: heroPurifier.url },
  { no: "02", model: "SMART Purifier", colour: "Light Wood", mrp: "₹26,999", discount: "38%", p1: "₹24,299", p50: "₹21,599", p100: "₹19,439", p500: "₹16,739", img: smartLightWood.url },
  { no: "03", model: "SMART Purifier", colour: "Dark Wood", mrp: "₹26,999", discount: "38%", p1: "₹24,299", p50: "₹21,599", p100: "₹19,439", p500: "₹16,739", img: smartDarkWood.url },
  { no: "04", model: "Circular Purifier", colour: "White", mrp: "₹18,999", discount: "40%", p1: "₹16,999", p50: "₹14,999", p100: "₹13,299", p500: "₹11,399", img: circularPurifier.url },
  { no: "05", model: "Desktop Purifier", colour: "White", mrp: "₹9,999", discount: "45%", p1: "₹8,999", p50: "₹7,499", p100: "₹6,499", img: circularPurifier.url, p500: "₹5,499" },
];

const features = [
  { icon: ShieldCheck, label: "HEPA H13", desc: "99.97% at 0.3μm" },
  { icon: Sparkles, label: "UV Sterilization", desc: "Kills bacteria & virus" },
  { icon: Leaf, label: "Energy Efficient", desc: "Under 35W usage" },
  { icon: Wind, label: "Smart Airflow", desc: "360° coverage" },
  { icon: Gauge, label: "Real-Time AQI", desc: "Live sensor display" },
  { icon: Cpu, label: "AI Purification", desc: "Adaptive modes" },
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

const infoRows: Array<[string, string, typeof MapPin]> = [
  ["Dispatch", "Ex-Works Ahmedabad", MapPin],
  ["Logistics", "Pan India delivery", Truck],
  ["Warranty", "2 Years", Award],
  ["Email", "hello@coco.in", Mail],
  ["Phone", "+91 90000 00000", Phone],
];

const modelOptions = [
  "SMART Air Purifier — White",
  "SMART Air Purifier — Light Wood",
  "SMART Air Purifier — Dark Wood",
  "Circular Air Purifier",
  "Desktop Air Purifier",
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

const timelineOptions = ["Within 1 week", "1–2 weeks", "2–4 weeks", "1–3 months", "Flexible"];

const clients = ["Taj Group", "Infosys", "Apollo", "ITC", "Zomato", "Reliance"];

export function CocoBulkOrdersPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(5);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema) });

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

  const scrollToForm = () => {
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-dvh bg-[#F5F2EC] text-[#161311] font-sans">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        {/* HERO */}
        <section className="relative grid gap-10 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24 lg:pb-28">
          {/* decorative rings */}
          <div className="pointer-events-none absolute -left-32 top-10 -z-0 h-72 w-72 rounded-full bg-gradient-to-br from-[#e8dcc4] to-transparent opacity-70 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-24 -z-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#d4e4dc] to-transparent opacity-60 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#5b5650] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              B2B · Volume Orders
            </span>
            <h1 className="mt-6 text-[42px] leading-[1.02] tracking-tight sm:text-[56px] lg:text-[76px]" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
              Cleaner air, <br className="hidden sm:block" />
              <span className="italic text-[#5b5650]">at scale.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[#4a4640]">
              Equip your workspace, hotel, hospital or facility with certified COCO air
              purification. Volume pricing, dedicated account manager, and rapid
              PAN-India dispatch — engineered for institutional scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-full bg-[#161311] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[#161311] backdrop-blur transition hover:bg-white"
              >
                View Pricing
              </a>
            </div>

            {/* trust bar */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8a8275]">
                Trusted By
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-[#5b5650]">
                {clients.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#eae3d3] via-[#f0ebde] to-[#dbd3c0] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)", backgroundSize: "18px 18px" }} />
              <img
                src={heroPurifier.url}
                alt="COCO Smart Air Purifier"
                className="absolute inset-0 h-full w-full object-contain p-10"
              />
              {/* floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/85 px-5 py-4 backdrop-blur-md shadow-lg"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8275]">Live AQI</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight">12</span>
                  <span className="text-xs font-medium text-emerald-600">Excellent</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="absolute right-6 top-6 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md shadow"
              >
                HEPA H13 · Certified
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 gap-3 pb-20 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white px-5 py-6 sm:px-7 sm:py-8"
            >
              <div className="text-3xl tracking-tight sm:text-4xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
              <div className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#161311]">{s.label}</div>
              <div className="mt-1 text-[12px] text-[#8a8275]">{s.sub}</div>
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#f0ebde] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </section>

        {/* PRICING */}
        <section id="pricing" className="pb-24 scroll-mt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">Pricing</p>
              <h2 className="mt-3 text-3xl tracking-tight sm:text-5xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Volume Pricing
              </h2>
              <p className="mt-3 max-w-lg text-[14px] text-[#5b5650]">Transparent tier-based pricing. The more you order, the more you save.</p>
            </div>
            <div className="hidden gap-2 sm:flex">
              {["Ex-GST", "Free Delivery 100+", "2 Yr Warranty"].map((t) => (
                <span key={t} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5b5650]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.3)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-[#161311] text-white">
                  <tr>
                    {["No.", "Product", "Colour", "MRP", "Save", "1 Unit", "50 Units", "100 Units", "500 Units"].map((h) => (
                      <th key={h} className="px-5 py-4 text-[10.5px] font-semibold uppercase tracking-[0.16em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((r, i) => (
                    <tr key={r.no} className={`transition hover:bg-[#faf7f0] ${i === pricingRows.length - 1 ? "" : "border-b border-black/5"}`}>
                      <td className="px-5 py-5 text-[#8a8275]">{r.no}</td>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f0e4]">
                            <img src={r.img} alt="" className="h-9 w-9 object-contain" />
                          </div>
                          <span className="font-medium">{r.model}</span>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-[#5b5650]">{r.colour}</td>
                      <td className="px-5 py-5 text-[#8a8275] line-through">{r.mrp}</td>
                      <td className="px-5 py-5">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                          {r.discount}
                        </span>
                      </td>
                      <td className="px-5 py-5">{r.p1}</td>
                      <td className="px-5 py-5">{r.p50}</td>
                      <td className="px-5 py-5">{r.p100}</td>
                      <td className="px-5 py-5 font-semibold">{r.p500}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PERFORMANCE */}
        <section id="performance" className="pb-24 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">Performance</p>
            <h2 className="mt-4 text-3xl tracking-tight sm:text-5xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Engineered for real air.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#5b5650]">
              Medical-grade HEPA H13 filtration combined with intelligent sensors.
              Trusted by offices, hotels, clinics and homes across the country.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-black/10 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f0e4] transition group-hover:bg-[#161311] group-hover:text-white">
                  <f.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.14em]">{f.label}</div>
                <div className="mt-1 text-[11.5px] text-[#8a8275]">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TWO COLUMN */}
        <section id="industries" className="grid gap-10 pb-24 scroll-mt-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">Industries</p>
            <h2 className="mt-4 text-4xl tracking-tight sm:text-5xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Every professional <br /> space.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#5b5650]">
              Whether furnishing one floor or an entire building, we tailor air
              purification with consistent quality and reliable support.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {industries.map((label) => (
                <li key={label} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm transition hover:border-black/30">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#161311] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
              {infoRows.map(([k, v, Icon], i) => (
                <div key={k} className={`flex items-center justify-between px-5 py-4 text-sm ${i === infoRows.length - 1 ? "" : "border-b border-black/5"}`}>
                  <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8275]">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                    {k}
                  </span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div id="enquiry" className="scroll-mt-24 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="flex items-center gap-2">
              <img src={cocoLogo.url} alt="" className="h-6 w-6 rounded object-contain" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">Enquiry</p>
            </div>
            <h2 className="mt-3 text-3xl tracking-tight sm:text-4xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Request a Quote
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5b5650]">
              Share your requirements and we'll respond within one business day.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name *" error={errors.fullName?.message}>
                <input className={inputCls} {...register("fullName")} />
              </Field>
              <Field label="Company / Organisation *" error={errors.company?.message}>
                <input className={inputCls} {...register("company")} />
              </Field>
              <Field label="Email *" error={errors.email?.message}>
                <input type="email" className={inputCls} {...register("email")} />
              </Field>
              <Field label="Phone *" error={errors.phone?.message}>
                <input className={inputCls} {...register("phone")} />
              </Field>
              <Field label="City *" error={errors.city?.message}>
                <input className={inputCls} {...register("city")} />
              </Field>
              <Field label="Country *" error={errors.country?.message}>
                <input className={inputCls} defaultValue="India" {...register("country")} />
              </Field>
              <Field label="Preferred Model *" error={errors.model?.message}>
                <select className={inputCls} defaultValue="" {...register("model")}>
                  <option value="" disabled>Select model</option>
                  {modelOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Quantity *" error={errors.quantity?.message}>
                <input type="number" min={1} className={inputCls} {...register("quantity")} />
              </Field>
              <Field label="Industry *" error={errors.industry?.message}>
                <select className={inputCls} defaultValue="" {...register("industry")}>
                  <option value="" disabled>Select industry</option>
                  {industryOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Delivery Timeline *" error={errors.timeline?.message}>
                <select className={inputCls} defaultValue="" {...register("timeline")}>
                  <option value="" disabled>Select timeline</option>
                  {timelineOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Additional Details" error={errors.details?.message}>
                  <textarea rows={4} className={`${inputCls} h-auto resize-y py-3`} {...register("details")} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#161311] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-black disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : (<>Send Enquiry <ArrowRight className="h-4 w-4" /></>)}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-[#161311] text-white">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2.5">
            <img src={cocoLogo.url} alt="COCO" className="h-8 w-8 rounded object-contain bg-white p-1" />
            <div>
              <div className="text-base font-semibold">COCO</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Premium Air Purifiers</div>
            </div>
          </div>
          <div className="text-[12px] text-white/60">© {new Date().getFullYear()} COCO. All rights reserved.</div>
        </div>
      </footer>

      {/* Success popup */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-[#F5F2EC] p-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#161311] text-white">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mt-6 text-3xl tracking-tight" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Quote Submitted
              </h3>
              <p className="mt-3 text-sm text-[#5b5650]">Thank you for your enquiry.</p>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#8a8275]">Redirecting in</p>
              <div className="mt-2 text-5xl tabular-nums" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
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
  "h-12 w-full rounded-xl border border-black/10 bg-[#F8F6F2] px-4 text-sm text-[#161311] outline-none transition placeholder:text-[#a8a098] focus:border-[#161311] focus:bg-white";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8275]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
