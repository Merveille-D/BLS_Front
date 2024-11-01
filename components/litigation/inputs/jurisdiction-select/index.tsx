import { JurisdictionSelectComponent } from "./component";
import { JurisdictionSelectErrorBoundary } from "./error";
export default function JurisdictionSelect(props) {
  return (
    <JurisdictionSelectErrorBoundary {...props}>
      <JurisdictionSelectComponent {...props} />
    </JurisdictionSelectErrorBoundary>
  );
}
