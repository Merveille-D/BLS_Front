import { LitigationNatureSelectComponent } from "./component";
import { LitigationNatureSelectErrorBoundary } from "./error";
export default function LitigationNatureSelect(props) {
  return (
    <LitigationNatureSelectErrorBoundary {...props}>
      <LitigationNatureSelectComponent {...props} />
    </LitigationNatureSelectErrorBoundary>
  );
}
