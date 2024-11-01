import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const MortgageRoutes = createRoutes({
  index: "/dashboard/safety/mortgage",
  mortgagesList: "/dashboard/safety/mortgage/list",
  mortgagePage: (id) => ({
    _basePath: `/dashboard/safety/mortgage/${id}`,
    index: "/",
  }),
});
