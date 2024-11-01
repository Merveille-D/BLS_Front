import { MovableSafetiesListErrorBoundary } from "./error";
import { MovableSafetiesListComponent } from "./component";
export default function MovableSafetiesList() {
  return (
    <MovableSafetiesListErrorBoundary>
      <MovableSafetiesListComponent />
    </MovableSafetiesListErrorBoundary>
  );
}
