import React from "react";
import { CollaboratorsViewErrorBoundary } from "./error";
import { CollaboratorsViewComponent } from "./component";
export default function CollaboratorsView(props) {
  return (
    <CollaboratorsViewErrorBoundary>
      <CollaboratorsViewComponent {...props} />
    </CollaboratorsViewErrorBoundary>
  );
}
