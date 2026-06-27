import { createFileRoute } from "@tanstack/react-router";

import { CocoBulkOrdersPage } from "@/components/coco-bulk-orders-page";

export const Route = createFileRoute("/bulk-orders")({
  head: () => ({
    meta: [
      { title: "COCO Bulk Orders | Premium B2B Air Purifiers" },
      {
        name: "description",
        content:
          "Request premium bulk pricing for COCO air purifiers across offices, hotels, healthcare, education and institutional spaces.",
      },
      { property: "og:title", content: "COCO Bulk Orders" },
      {
        property: "og:description",
        content:
          "Premium B2B bulk enquiries for COCO air purifiers with curated products, rapid quote turnaround and a polished procurement experience.",
      },
    ],
  }),
  component: CocoBulkOrdersPage,
});
