import React from "react";
import { ShareholderSelectComponent } from "./component";
import { ShareholderSelectErrorBoundary } from "./error";
export default function ShareholderSelect(props) {
  return (
    <ShareholderSelectErrorBoundary {...props}>
      <ShareholderSelectComponent {...props} />
    </ShareholderSelectErrorBoundary>
  );
}
