import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const EvaluationRoutes = createRoutes({
  index: "/dashboard/evaluation",
  evaluationsList: "/dashboard/evaluation/list",
  profilesList: "/dashboard/evaluation/profiles",
  evaluationPage: (id) => ({
    _basePath: `/dashboard/evaluation/${id}`,
    index: "/",
  }),
});
