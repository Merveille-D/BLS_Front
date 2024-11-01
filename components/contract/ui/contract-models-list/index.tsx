import React from "react";
import { ContractModelsListErrorBoundary } from "./error";
import { ContractModelsListComponent } from "./component";
export default function ContractModelsList(props) {
  return (
    <ContractModelsListErrorBoundary>
      <ContractModelsListComponent {...props} />
    </ContractModelsListErrorBoundary>
  );
}
