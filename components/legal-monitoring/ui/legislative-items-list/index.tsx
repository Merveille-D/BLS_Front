import { LegislativeItemsListErrorBoundary } from "./error";
import { LegislativeItemsListComponent } from "./component";
export default function LegislativeItemsList() {
  return (
    <LegislativeItemsListErrorBoundary>
      <LegislativeItemsListComponent />
    </LegislativeItemsListErrorBoundary>
  );
}
