import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const ModulesRoutes = createRoutes({
  modules: "/dashboard/modules",
  submodules: (slug) => `/dashboard/modules/${slug}/submodules`,
});
