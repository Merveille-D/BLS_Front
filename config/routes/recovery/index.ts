import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const RecoveryRoutes = createRoutes({
  index: "/dashboard/recovery",
  recoveriesList: "/dashboard/recovery/list",
  recoveryPage: (id) => ({
    _basePath: `/dashboard/recovery/${id}`,
    index: "/",
  }),
});
