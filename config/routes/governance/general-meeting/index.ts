import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const GeneralMeetingRoutes = createRoutes({
  index: "/dashboard/governance/general-meeting",
  archives: "/dashboard/governance/general-meeting/archives",
  session: (id) => ({
    _basePath: `/dashboard/governance/general-meeting/${id}`,
    index: "/",
  }),
});
