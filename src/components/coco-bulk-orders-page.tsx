import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cpu,
  Gauge,
  Leaf,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  { value: "Up to 60%", label: "Volume Savings" },
  { value: "500+", label: "Units Per Order" },
  { value: "Pan India", label: "Delivery Network" },
  { value: "24 Hrs", label: "Quote Response" },
];

const pricingRows = [
  {
    no: "01",
    model: "SMART Air Purifier",
    colour: "White",
    mrp: "₹24,999",
    discount: "Up to 35%",
    p1: "₹22,499",
    p50: "₹19,999",
    p100: "₹17,999",
    p500: "₹16,249",
  },
  {
    no: "02",
    model: "SMART Air Purifier",
    colour: "Light Wood",
    mrp: "₹26,999",
    discount: "Up to 38%",
    p1: "₹24,299",
    p50: "₹21,599",
    p100: "₹19,439",
    p500: "₹16,739",
  },
  {
    no: "03",
    model: "SMART Air Purifier",
    colour: "Dark Wood",
    mrp: "₹26,999",
    discount: "Up to 38%",
    p1: "₹24,299",
    p50: "₹21,599",
    p100: "₹19,439",
    p500: "₹16,739",
  },
  {
    no: "04",
    model: "Circular Air Purifier",
    colour: "White",
    mrp: "₹18,999",
    discount: "Up to 40%",
    p1: "₹16,999",
    p50: "₹14,999",
    p100: "₹13,299",
    p500: "₹11,399",
  },
  {
    no: "05",
    model: "Desktop Air Purifier",
    colour: "White",
    mrp: "₹9,999",
    discount: "Up to 45%",
    p1: "₹8,999",
    p50: "₹7,499",
    p100: "₹6,499",
    p500: "₹5,499",
  },
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

const infoRows: Array<[string, string]> = [
  ["Dispatch", "Ex-Works Ahmedabad"],
  ["Logistics", "Pan India delivery"],
  ["Warranty", "2 Years"],
  ["Support", "Dedicated Account Manager"],
  ["Email", "hello@coco.in"],
  ["Phone", "+91 90000 00000"],
  ["Website", "www.cocoairpurifier.com"],
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

  const {
    register,
    handleSubmit,
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

  return (
    <main className="min-h-dvh bg-[#F8F6F2] text-[#1c1a17]">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-8 sm:py-10">
        {/* Back button */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-[#1c1a17] backdrop-blur transition hover:bg-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>

        {/* Section 1 — Intro */}
        <section className="pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
            Volume Orders
          </p>
          <h1
            className="mt-5 max-w-4xl text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]"
            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Bulk Supply for Businesses &amp; Institutions
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#5b5650]">
            Equip your workspace, hotel, hospital or facility with certified air
            purification at scale. Competitive volume pricing, dedicated support,
            and fast delivery across India.
          </p>
          <div className="mt-10 h-px w-full bg-black/10" />
        </section>

        {/* Section 2 — Stats */}
        <section className="grid grid-cols-2 gap-4 pb-16 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-black/10 bg-white px-6 py-8"
            >
              <div
                className="text-3xl tracking-tight sm:text-4xl"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8a8275]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Section 3 — Pricing Table */}
        <section className="pb-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
                Pricing
              </p>
              <h2
                className="mt-3 text-3xl tracking-tight sm:text-4xl"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Volume Pricing
              </h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-[#1c1a17] text-white">
                  <tr>
                    {[
                      "No.",
                      "Model",
                      "Colour",
                      "MRP",
                      "Discount",
                      "1 Unit",
                      "50 Units",
                      "100 Units",
                      "500 Units",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((r, i) => (
                    <tr
                      key={r.no}
                      className={i === pricingRows.length - 1 ? "" : "border-b border-black/5"}
                    >
                      <td className="px-5 py-5 text-[#8a8275]">{r.no}</td>
                      <td className="px-5 py-5 font-medium">{r.model}</td>
                      <td className="px-5 py-5 text-[#5b5650]">{r.colour}</td>
                      <td className="px-5 py-5 text-[#5b5650] line-through">{r.mrp}</td>
                      <td className="px-5 py-5">
                        <span className="inline-flex rounded-full bg-[#1c1a17] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
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

        {/* Section 4 — Built for Performance */}
        <section className="pb-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
            Performance
          </p>
          <h2
            className="mx-auto mt-4 max-w-3xl text-3xl tracking-tight sm:text-5xl"
            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Built for Performance
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#5b5650]">
            Medical-grade HEPA H13 filtration combined with intelligent sensors.
            Trusted by offices, hotels, clinics and homes across the country.
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
                <div className="mt-4 text-xs uppercase tracking-[0.18em] text-[#1c1a17]">
                  {f.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 5 — Two column */}
        <section className="grid gap-10 pb-24 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
              Industries
            </p>
            <h2
              className="mt-4 text-4xl tracking-tight sm:text-5xl"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Every professional space.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#5b5650]">
              Whether furnishing one floor or an entire building, we provide
              tailored air purification solutions with consistent quality and
              reliable support.
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
                  <span className="text-xs uppercase tracking-[0.18em] text-[#8a8275]">
                    {k}
                  </span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">
              Enquiry
            </p>
            <h2
              className="mt-3 text-3xl tracking-tight sm:text-4xl"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Request a Quote
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5b5650]">
              Share your requirements and we will respond within one business day.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Full Name *" error={errors.fullName?.message}>
                <input className={inputCls} {...register("fullName")} />
              </Field>
              <Field label="Company / Organisation *" error={errors.company?.message}>
                <input className={inputCls} {...register("company")} />
              </Field>
              <Field label="Email *" error={errors.email?.message}>
                <input type="email" className={inputCls} {...register("email")} />
              </Field>
              <Field label="Phone Number *" error={errors.phone?.message}>
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
                  <option value="" disabled>
                    Select model
                  </option>
                  {modelOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Quantity Required *" error={errors.quantity?.message}>
                <input type="number" min={1} className={inputCls} {...register("quantity")} />
              </Field>
              <Field label="Industry Type *" error={errors.industry?.message}>
                <select className={inputCls} defaultValue="" {...register("industry")}>
                  <option value="" disabled>
                    Select industry
                  </option>
                  {industryOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Delivery Timeline *" error={errors.timeline?.message}>
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
                <Field label="Additional Details" error={errors.details?.message}>
                  <textarea
                    rows={4}
                    className={`${inputCls} h-auto resize-y py-3`}
                    {...register("details")}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#1c1a17] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-black disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

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
              className="w-full max-w-md rounded-3xl bg-[#F8F6F2] p-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1c1a17] text-white">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3
                className="mt-6 text-3xl tracking-tight"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Quote Submitted Successfully
              </h3>
              <p className="mt-3 text-sm text-[#5b5650]">Thank you for your enquiry.</p>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#8a8275]">
                Redirecting to Home in
              </p>
              <div
                className="mt-2 text-5xl tabular-nums"
                style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
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
  "h-12 w-full rounded-xl border border-black/10 bg-[#F8F6F2] px-4 text-sm text-[#1c1a17] outline-none transition placeholder:text-[#a8a098] focus:border-[#1c1a17]";

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
