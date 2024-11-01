import { UpdateLinkItemDialogComponent } from "./component";
import { UpdateLinkItemDialogErrorBoundary } from "./error";
export default function UpdateLinkItemDialog(props) {
  return (
    <UpdateLinkItemDialogErrorBoundary>
      <UpdateLinkItemDialogComponent {...props} />
    </UpdateLinkItemDialogErrorBoundary>
  );
}
