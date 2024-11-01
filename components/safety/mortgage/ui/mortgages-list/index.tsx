import { MortgagesListErrorBoundary } from "./error";
import { MortgagesListComponent } from "./component";
export default function MortgagesList() {
  return (
    <MortgagesListErrorBoundary>
      <MortgagesListComponent />
    </MortgagesListErrorBoundary>
  );
}
