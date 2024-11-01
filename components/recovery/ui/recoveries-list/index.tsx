import { RecoveriesListErrorBoundary } from "./error";
import { RecoveriesListComponent } from "./component";
export default function RecoveriesList() {
  return (
    <RecoveriesListErrorBoundary>
      <RecoveriesListComponent />
    </RecoveriesListErrorBoundary>
  );
}
