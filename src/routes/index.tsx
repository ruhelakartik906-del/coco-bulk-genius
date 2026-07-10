import { createFileRoute } from "@tanstack/react-router";

import { CocoBulkOrdersPage } from "@/components/coco-bulk-orders-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COCO Bulk Orders | Premium B2B Air Purifiers" },
      {
        name: "description",
        content:
          "Request premium bulk pricing for COCO air purifiers across offices, hotels, healthcare, education and institutional spaces.",
      },
      { property: "og:title", content: "COCO Bulk Orders | Premium B2B Air Purifiers" },
      {
        property: "og:description",
        content:
          "Request premium bulk pricing for COCO air purifiers across offices, hotels, healthcare, education and institutional spaces.",
      },
    ],
  }),
  component: CocoBulkOrdersPage,
});
