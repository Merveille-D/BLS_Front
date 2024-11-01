import React from "react";
import { ModuleItemSelectComponent } from "./component";
import { ModuleItemSelectErrorBoundary } from "./error";
export default function ModuleItemSelect(props) {
  return (
    <ModuleItemSelectErrorBoundary {...props}>
      <ModuleItemSelectComponent {...props} />
    </ModuleItemSelectErrorBoundary>
  );
}
