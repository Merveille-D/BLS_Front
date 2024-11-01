import { LawyerSelectComponent } from "./component";
import { LawyerSelectErrorBoundary } from "./error";
export default function LawyerSelect(props) {
  return (
    <LawyerSelectErrorBoundary {...props}>
      <LawyerSelectComponent {...props} />
    </LawyerSelectErrorBoundary>
  );
}
