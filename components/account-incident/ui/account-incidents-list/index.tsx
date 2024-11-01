import { AccountIncidentsListErrorBoundary } from "./error";
import { AccountIncidentsListComponent } from "./component";
export default function AccountIncidentsList() {
  return (
    <AccountIncidentsListErrorBoundary>
      <AccountIncidentsListComponent />
    </AccountIncidentsListErrorBoundary>
  );
}
