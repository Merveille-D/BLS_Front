import React from "react";
import { AuditCriteriaViewErrorBoundary } from "./error";
import { AuditCriteriaViewComponent } from "./component";
export default function AuditCriteriaView(props) {
  return (
    <AuditCriteriaViewErrorBoundary>
      <AuditCriteriaViewComponent {...props} />
    </AuditCriteriaViewErrorBoundary>
  );
}
