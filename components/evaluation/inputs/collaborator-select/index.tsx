import React from "react";
import { CollaboratorSelectComponent } from "./component";
import { CollaboratorSelectErrorBoundary } from "./error";
export default function CollaboratorSelect(props) {
  return (
    <CollaboratorSelectErrorBoundary {...props}>
      <CollaboratorSelectComponent {...props} />
    </CollaboratorSelectErrorBoundary>
  );
}
