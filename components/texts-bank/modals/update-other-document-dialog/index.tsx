import { UpdateOtherDocumentDialogComponent } from "./component";
import { UpdateOtherDocumentDialogErrorBoundary } from "./error";
export default function UpdateOtherDocumentDialog(props) {
  return (
    <UpdateOtherDocumentDialogErrorBoundary>
      <UpdateOtherDocumentDialogComponent {...props} />
    </UpdateOtherDocumentDialogErrorBoundary>
  );
}
