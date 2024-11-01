import { GuaranteeSelectComponent } from "./component";
import { GuaranteeSelectErrorBoundary } from "./error";
export default function GuaranteeSelect(props) {
  return (
    <GuaranteeSelectErrorBoundary {...props}>
      <GuaranteeSelectComponent {...props} />
    </GuaranteeSelectErrorBoundary>
  );
}
