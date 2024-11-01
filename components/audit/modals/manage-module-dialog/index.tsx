import React from "react";
import { ManageModuleDialogComponent } from "./component";
import { ManageModuleDialogErrorBoundary } from "./error";
export default function ManageModuleDialog(props) {
  return (
    <ManageModuleDialogErrorBoundary>
      <ManageModuleDialogComponent {...props} />
    </ManageModuleDialogErrorBoundary>
  );
}
