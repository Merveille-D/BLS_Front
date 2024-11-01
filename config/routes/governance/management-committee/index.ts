import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const ManagementCommitteeRoutes = createRoutes({
  index: "/dashboard/governance/management-committee",
  archives: "/dashboard/governance/management-committee/archives",
  session: (id) => ({
    _basePath: `/dashboard/governance/management-committee/${id}`,
    index: "/",
  }),
});
