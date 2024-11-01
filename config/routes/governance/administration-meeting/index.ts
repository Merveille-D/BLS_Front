import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const AdministrationMeetingRoutes = createRoutes({
  index: "/dashboard/governance/administration-meeting",
  archives: "/dashboard/governance/administration-meeting/archives",
  session: (id) => ({
    _basePath: `/dashboard/governance/administration-meeting/${id}`,
    index: "/",
  }),
});
