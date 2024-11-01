import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const LitigationRoutes = createRoutes({
  index: "/dashboard/litigation",
  litigationList: "/dashboard/litigation/list",
  litigationPage: (id) => ({
    _basePath: `/dashboard/litigation/${id}`,
    index: "/",
  }),
});
