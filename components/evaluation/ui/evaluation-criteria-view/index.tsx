import React from "react";
import { EvaluationCriteriaViewErrorBoundary } from "./error";
import { EvaluationCriteriaViewComponent } from "./component";
export default function EvaluationCriteriaView(props) {
  return (
    <EvaluationCriteriaViewErrorBoundary>
      <EvaluationCriteriaViewComponent {...props} />
    </EvaluationCriteriaViewErrorBoundary>
  );
}
