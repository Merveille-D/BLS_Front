import React from "react";
import { ThirdPartySelectComponent } from "./component";
import { ThirdPartySelectErrorBoundary } from "./error";
export default function ThirdPartySelect(props) {
  return (
    <ThirdPartySelectErrorBoundary {...props}>
      <ThirdPartySelectComponent {...props} />
    </ThirdPartySelectErrorBoundary>
  );
}
