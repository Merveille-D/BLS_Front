import { ContractsListErrorBoundary } from "./error";
import { ContractsListComponent } from "./component";
export default function ContractsList() {
  return (
    <ContractsListErrorBoundary>
      <ContractsListComponent />
    </ContractsListErrorBoundary>
  );
}
