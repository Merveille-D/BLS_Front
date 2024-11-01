import { JudicialItemsListErrorBoundary } from "./error";
import { JudicialItemsListComponent } from "./component";
export default function JudicialItemsList() {
  return (
    <JudicialItemsListErrorBoundary>
      <JudicialItemsListComponent />
    </JudicialItemsListErrorBoundary>
  );
}
