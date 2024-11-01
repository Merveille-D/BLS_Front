import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const MovableSafetyRoutes = createRoutes({
  index: "/dashboard/safety/movable-safety",
  movableSafetiesList: "/dashboard/safety/movable-safety/list",
  movableSafetyPage: (id) => ({
    _basePath: `/dashboard/safety/movable-safety/${id}`,
    index: "/",
  }),
});
