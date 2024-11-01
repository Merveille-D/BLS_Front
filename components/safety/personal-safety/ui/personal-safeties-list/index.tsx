import { PersonalSafetiesListErrorBoundary } from "./error";
import { PersonalSafetiesListComponent } from "./component";
export default function PersonalSafetiesList() {
  return (
    <PersonalSafetiesListErrorBoundary>
      <PersonalSafetiesListComponent />
    </PersonalSafetiesListErrorBoundary>
  );
}
