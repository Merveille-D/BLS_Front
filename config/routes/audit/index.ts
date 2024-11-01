import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const AuditRoutes = createRoutes({
  index: "/dashboard/audit",
  auditsList: "/dashboard/audit/list",
  auditModulesList: "/dashboard/audit/modules",
  auditPage: (id) => ({
    _basePath: `/dashboard/audit/${id}`,
    index: "/",
  }),
});
