import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const PersonalSafetyRoutes = createRoutes({
  index: "/dashboard/safety/personal-safety",
  personalSafetiesList: "/dashboard/safety/personal-safety/list",
  personalSafetyPage: (id) => ({
    _basePath: `/dashboard/safety/personal-safety/${id}`,
    index: "/",
  }),
});
