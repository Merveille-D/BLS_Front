import { AuditsListErrorBoundary } from "./error";
import { AuditsListComponent } from "./component";
export default function AuditsList() {
  return (
    <AuditsListErrorBoundary>
      <AuditsListComponent />
    </AuditsListErrorBoundary>
  );
}
