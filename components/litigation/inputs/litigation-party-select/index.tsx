import { LitigationPartySelectComponent } from "./component";
import { LitigationPartySelectErrorBoundary } from "./error";
export default function LitigationPartySelect(props) {
  return (
    <LitigationPartySelectErrorBoundary {...props}>
      <LitigationPartySelectComponent {...props} />
    </LitigationPartySelectErrorBoundary>
  );
}
