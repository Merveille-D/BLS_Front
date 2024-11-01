import { ContractSelectComponent } from "./component";
import { ContractSelectErrorBoundary } from "./error";
export default function ContractSelect(props) {
  return (
    <ContractSelectErrorBoundary {...props}>
      <ContractSelectComponent {...props} />
    </ContractSelectErrorBoundary>
  );
}
