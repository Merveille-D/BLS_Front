import { EvaluationsListErrorBoundary } from "./error";
import { EvaluationsListComponent } from "./component";
export default function EvaluationsList() {
  return (
    <EvaluationsListErrorBoundary>
      <EvaluationsListComponent />
    </EvaluationsListErrorBoundary>
  );
}
