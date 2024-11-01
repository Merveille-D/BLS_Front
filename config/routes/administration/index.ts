import { createRoutes } from "@adebsa2401/routes-tree-builder";
export * from "./users";
export * from "./roles";
export * from "./subsidiaries";
export const AdministrationRoutes = createRoutes({
  index: "/dashboard/administration",
});
