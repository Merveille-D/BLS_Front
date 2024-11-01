import { LitigationListErrorBoundary } from "./error";
import { LitigationListComponent } from "./component";
export default function LitigationList() {
  return (
    <LitigationListErrorBoundary>
      <LitigationListComponent />
    </LitigationListErrorBoundary>
  );
}
