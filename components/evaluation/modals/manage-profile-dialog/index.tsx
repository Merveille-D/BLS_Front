import React from "react";
import { ManageProfileDialogComponent } from "./component";
import { ManageProfileDialogErrorBoundary } from "./error";
export default function ManageProfileDialog(props) {
  return (
    <ManageProfileDialogErrorBoundary>
      <ManageProfileDialogComponent {...props} />
    </ManageProfileDialogErrorBoundary>
  );
}
