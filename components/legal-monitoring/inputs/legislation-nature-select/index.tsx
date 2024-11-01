import { LegislationNatureSelectComponent } from "./component";
import { LegislationNatureSelectErrorBoundary } from "./error";
export default function LegislationNatureSelect(props) {
  return (
    <LegislationNatureSelectErrorBoundary {...props}>
      <LegislationNatureSelectComponent {...props} />
    </LegislationNatureSelectErrorBoundary>
  );
}
