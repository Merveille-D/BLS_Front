import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const ShareholdingRoutes = createRoutes({
  index: "/dashboard/governance/shareholding",
  sharesTransferPage: (transferId) => ({
    _basePath: `/dashboard/governance/shareholding/transfers/${transferId}`,
    index: "/",
  }),
});
