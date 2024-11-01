import { UpdateTextItemDialogComponent } from "./component";
import { UpdateTextItemDialogErrorBoundary } from "./error";
export default function UpdateTextItemDialog(props) {
  return (
    <UpdateTextItemDialogErrorBoundary>
      <UpdateTextItemDialogComponent {...props} />
    </UpdateTextItemDialogErrorBoundary>
  );
}
