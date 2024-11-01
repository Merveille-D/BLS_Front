import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const AccountIncidentRoutes = createRoutes({
  index: "/dashboard/account-incident",
  accountIncidentsList: "/dashboard/account-incident/list",
  accountIncidentPage: (id) => ({
    _basePath: `/dashboard/account-incident/${id}`,
    index: "/",
  }),
});
