import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, Check, Mail, Phone, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import cocoLogoAsset from "@/assets/coco-logo.avif.asset.json";
import heroPurifierAsset from "@/assets/coco-smart-white.png.asset.json";
import smartLightWoodAsset from "@/assets/coco-smart-light-wood.png.asset.json";
import smartDarkWoodAsset from "@/assets/coco-smart-dark-wood.png.asset.json";
import circularPurifierAsset from "@/assets/coco-air-purifier-hero.webp.asset.json";
import desktopPurifierAsset from "@/assets/coco-desktop-purifier.webp.asset.json";

// Assets are served from Lovable's CDN. When deployed outside Lovable (e.g. Vercel),
// the relative `/__l5e/...` path doesn't exist, so we prefix with the absolute CDN host.
const ASSET_CDN = "https://coco-bulk-genius.lovable.app";
const toAbsolute = (a: { url: string }) => (a.url.startsWith("http") ? a.url : `${ASSET_CDN}${a.url}`);
const cocoLogo = { url: toAbsolute(cocoLogoAsset) };
const heroPurifier = { url: toAbsolute(heroPurifierAsset) };
const smartLightWood = { url: toAbsolute(smartLightWoodAsset) };
const smartDarkWood = { url: toAbsolute(smartDarkWoodAsset) };
const circularPurifier = { url: toAbsolute(circularPurifierAsset) };
const desktopPurifier = { url: toAbsolute(desktopPurifierAsset) };

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

const pricingRows = [
  { no: "01", model: "SMART Air Purifier", colour: "White", mrp: "₹19,999", discount: "up to 45%", p1: "₹11,999", p50: "₹11,666", p100: "₹11,333", p500: "₹10,999", img: heroPurifier.url },
  { no: "02", model: "SMART Air Purifier", colour: "Light Wood", mrp: "₹22,999", discount: "up to 52%", p1: "₹13,999", p50: "₹13,333", p100: "₹12,999", p500: "₹11,999", img: smartLightWood.url },
  { no: "03", model: "SMART Air Purifier", colour: "Dark Wood", mrp: "₹22,999", discount: "up to 52%", p1: "₹13,999", p50: "₹13,333", p100: "₹12,999", p500: "₹11,999", img: smartDarkWood.url },
  { no: "04", model: "Circular Air Purifier", colour: "White", mrp: "₹18,999", discount: "up to 58%", p1: "₹8,999", p50: "₹8,666", p100: "₹8,333", p500: "₹7,999", img: circularPurifier.url },
  { no: "05", model: "Desktop Air Purifier", colour: "White", mrp: "₹9,999", discount: "up to 60%", p1: "₹4,999", p50: "₹4,499", p100: "₹4,411", p500: "₹3,999", img: desktopPurifier.url },
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

const infoRows: Array<[string, string, typeof Truck]> = [
  ["Logistics", "Pan India delivery", Truck],
  ["Warranty", "1 Year", Award],
  ["Email", "cocoairpurifier@gmail.com", Mail],
  ["Phone", "+91 7863051739", Phone],
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

export function CocoBulkOrdersPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema) });

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => {
      window.location.href = "https://www.cocoairpurifier.com";
    }, 2000);
    return () => clearTimeout(t);
  }, [submitted]);

  const onSubmit = async (values: EnquiryValues) => {
    try {
      await fetch("https://formsubmit.co/ajax/cocoairpurifier@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New COCO Bulk Enquiry from ${values.fullName}`,
          _template: "table",
          _captcha: "false",
          ...values,
        }),
      });
    } catch (e) {
      console.error("Form submission failed", e);
    }
    reset();
    setSubmitted(true);
  };

  return (
    <main className="min-h-dvh bg-[#F5F2EC] text-[#161311] font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F5F2EC]/85 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:px-8 sm:py-4">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <img src={cocoLogo.url} alt="COCO" className="h-12 w-12 shrink-0 rounded-md object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
          </a>
          <a
            href="https://www.cocoairpurifier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/15 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#161311] backdrop-blur transition hover:bg-white sm:px-5 sm:py-2.5 sm:text-[12px] sm:tracking-[0.14em]"
          >
            Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        {/* FORM + INDUSTRIES */}
        <section className="grid gap-8 pt-10 pb-16 md:gap-10 lg:grid-cols-2 lg:gap-14 lg:pt-20 lg:pb-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8275] sm:text-[11px] sm:tracking-[0.28em]">Industries</p>
            <h2 className="mt-3 text-[28px] leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Every professional space.
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-6 text-[#5b5650] sm:text-[15px] sm:leading-7">
              Whether furnishing one floor or an entire building, we tailor air
              purification with consistent quality and reliable support.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              {industries.map((label) => (
                <li key={label} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm transition hover:border-black/30 sm:px-4 sm:py-3.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#161311] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="min-w-0">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white sm:mt-8">
              {infoRows.map(([k, v, Icon], i) => (
                <div key={k} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-sm sm:px-5 sm:py-4 ${i === infoRows.length - 1 ? "" : "border-b border-black/5"}`}>
                  <span className="flex min-w-0 items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8275] sm:gap-3 sm:text-[11px] sm:tracking-[0.18em]">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                    <span className="truncate">{k}</span>
                  </span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div id="enquiry" className="scroll-mt-20 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8275] sm:text-[11px] sm:tracking-[0.28em]">Enquiry</p>
            <h2 className="mt-3 text-[26px] tracking-tight sm:text-3xl lg:text-4xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Request a Quote
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5b5650]">
              Share your requirements and we'll respond within one business day.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-4">
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
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#161311] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black disabled:opacity-60 sm:mt-2 sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.22em]"
                >
                  {isSubmitting ? "Sending…" : (<>Send Enquiry <ArrowRight className="h-4 w-4 shrink-0" /></>)}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="pb-16 scroll-mt-20 sm:pb-24">
          <div className="mb-6 sm:mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8275] sm:text-[11px] sm:tracking-[0.28em]">Pricing</p>
            <h2 className="mt-3 text-[28px] tracking-tight sm:text-4xl lg:text-5xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Volume Pricing
            </h2>
            <p className="mt-3 max-w-lg text-[13px] text-[#5b5650] sm:text-[14px]">Transparent tier-based pricing. The more you order, the more you save.</p>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.3)] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-[#161311] text-white">
                  <tr>
                    {["Sr. No.", "Model", "Colour", "Price (Rs./Unit)", "Discount", "1 Unit Price (Rs.)", "50 Units Price (Rs.)", "100 Units Price (Rs.)", "500 Units Price (Rs.)"].map((h) => (
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

          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {pricingRows.map((r) => (
              <div key={r.no} className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-30px_rgba(0,0,0,0.3)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5f0e4]">
                    <img src={r.img} alt="" className="h-10 w-10 object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold leading-tight">{r.model}</p>
                        <p className="mt-0.5 text-xs text-[#5b5650]">{r.colour}</p>
                      </div>
                      <span className="inline-flex shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                        {r.discount}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#8a8275] line-through">MRP {r.mrp}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-xl bg-[#faf7f0] p-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#8a8275]">1 U</p>
                    <p className="mt-0.5 text-sm font-semibold">{r.p1}</p>
                  </div>
                  <div className="rounded-xl bg-[#faf7f0] p-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#8a8275]">50 U</p>
                    <p className="mt-0.5 text-sm font-semibold">{r.p50}</p>
                  </div>
                  <div className="rounded-xl bg-[#faf7f0] p-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#8a8275]">100 U</p>
                    <p className="mt-0.5 text-sm font-semibold">{r.p100}</p>
                  </div>
                  <div className="rounded-xl bg-[#faf7f0] p-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#8a8275]">500 U</p>
                    <p className="mt-0.5 text-sm font-semibold">{r.p500}</p>
                  </div>
                </div>
              </div>
            ))}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-[#F5F2EC] p-7 text-center sm:rounded-3xl sm:p-10"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#161311] text-white sm:h-14 sm:w-14">
                <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 text-2xl tracking-tight sm:mt-6 sm:text-3xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Form Submitted
              </h3>
              <p className="mt-3 text-sm text-[#5b5650]">Thank you for your enquiry.</p>
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[#8a8275] sm:mt-6">Redirecting…</p>
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
