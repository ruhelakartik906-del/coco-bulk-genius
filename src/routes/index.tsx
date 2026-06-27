import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import whitePurifier from "@/assets/coco-smart-white.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COCO Air Purifiers" },
      {
        name: "description",
        content: "COCO premium air purification for homes, businesses and institutions.",
      },
      { property: "og:title", content: "COCO Air Purifiers" },
      {
        property: "og:description",
        content: "Explore premium COCO air purification and dedicated B2B bulk ordering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-dvh bg-background px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="section-shell flex min-h-[calc(100dvh-5rem)] items-center">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
        >
          <div>
            <p className="eyebrow">COCO</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Premium air purification for modern spaces.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Refined design, cleaner air, and a dedicated B2B ordering experience for offices, hospitality, healthcare and institutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/bulk-orders" className="button-primary">
                Open Bulk Orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="panel overflow-hidden p-6 sm:p-8">
            <div className="aspect-[5/4] rounded-[calc(var(--radius)-2px)] bg-surface-strong/70">
              <img
                src={whitePurifier.url}
                alt="COCO SMART Air Purifier in white finish"
                className="h-full w-full object-contain p-6 sm:p-8"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
