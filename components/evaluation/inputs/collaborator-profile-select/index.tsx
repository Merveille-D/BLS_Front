import { CollaboratorProfileSelectComponent } from "./component";
import { CollaboratorProfileSelectErrorBoundary } from "./error";
export default function CollaboratorProfileSelect(props) {
  return (
    <CollaboratorProfileSelectErrorBoundary {...props}>
      <CollaboratorProfileSelectComponent {...props} />
    </CollaboratorProfileSelectErrorBoundary>
  );
}
