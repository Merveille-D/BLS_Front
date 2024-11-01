import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const TextsBankRoutes = createRoutes({
  index: "/dashboard/texts-bank",
  linksList: "/dashboard/texts-bank/links",
  textsList: "/dashboard/texts-bank/texts",
  otherDocumentsList: "/dashboard/texts-bank/other-documents",
});
