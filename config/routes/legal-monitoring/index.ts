import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const LegalMonitoringRoutes = createRoutes({
  index: "/dashboard/legal-monitoring",
  judicialList: "/dashboard/legal-monitoring/judicial",
  judicialItemPage: (id) => ({
    _basePath: `/dashboard/legal-monitoring/judicial/${id}`,
    index: "/",
  }),
  legislativeList: "/dashboard/legal-monitoring/legislative",
  legislativeItemPage: (id) => ({
    _basePath: `/dashboard/legal-monitoring/legislative/${id}`,
    index: "/",
  }),
});
