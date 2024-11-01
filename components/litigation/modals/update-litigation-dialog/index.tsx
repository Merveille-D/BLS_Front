import { UpdateLitigationDialogComponent } from "./component";
import { UpdateLitigationDialogErrorBoundary } from "./error";
export default function UpdateLitigationDialog(props) {
  return (
    <UpdateLitigationDialogErrorBoundary>
      <UpdateLitigationDialogComponent {...props} />
    </UpdateLitigationDialogErrorBoundary>
  );
}
