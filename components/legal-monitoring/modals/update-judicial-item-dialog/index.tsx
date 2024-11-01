import { UpdateJudicialItemDialogComponent } from "./component";
import { UpdateJudicialItemDialogErrorBoundary } from "./error";
export default function UpdateJudicialItemDialog(props) {
  return (
    <UpdateJudicialItemDialogErrorBoundary>
      <UpdateJudicialItemDialogComponent {...props} />
    </UpdateJudicialItemDialogErrorBoundary>
  );
}
