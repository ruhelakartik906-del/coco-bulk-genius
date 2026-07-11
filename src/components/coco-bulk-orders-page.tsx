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
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <img src={cocoLogo.url} alt="COCO" className="h-16 w-16 rounded-md object-contain sm:h-20 sm:w-20" />
          </a>
          <a
            href="https://www.cocoairpurifier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#161311] backdrop-blur transition hover:bg-white"
          >
            Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        {/* FORM + INDUSTRIES */}
        <section className="grid gap-10 pt-14 pb-20 lg:grid-cols-2 lg:gap-14 lg:pt-20">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8275]">Enquiry</p>
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
          </div>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.3)]">
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
              className="w-full max-w-md rounded-3xl bg-[#F5F2EC] p-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#161311] text-white">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="mt-6 text-3xl tracking-tight" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Form Submitted
              </h3>
              <p className="mt-3 text-sm text-[#5b5650]">Thank you for your enquiry.</p>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#8a8275]">Redirecting…</p>
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
