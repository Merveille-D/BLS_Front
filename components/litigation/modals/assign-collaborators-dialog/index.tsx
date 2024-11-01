import { AssignCollaboratorsDialogComponent } from "./component";
import { AssignCollaboratorsDialogErrorBoundary } from "./error";
export default function AssignCollaboratorsDialog(props) {
  return (
    <AssignCollaboratorsDialogErrorBoundary>
      <AssignCollaboratorsDialogComponent {...props} />
    </AssignCollaboratorsDialogErrorBoundary>
  );
}
