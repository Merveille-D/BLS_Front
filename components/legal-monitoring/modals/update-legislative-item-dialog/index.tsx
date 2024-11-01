import { UpdateLegislativeItemDialogComponent } from "./component";
import { UpdateLegislativeItemDialogErrorBoundary } from "./error";
export default function UpdateLegislativeItemDialog(props) {
  return (
    <UpdateLegislativeItemDialogErrorBoundary>
      <UpdateLegislativeItemDialogComponent {...props} />
    </UpdateLegislativeItemDialogErrorBoundary>
  );
}
