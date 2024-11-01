import { UpdateContractDialogComponent } from "./component";
import { UpdateContractDialogErrorBoundary } from "./error";
export default function UpdateContractDialog(props) {
  return (
    <UpdateContractDialogErrorBoundary>
      <UpdateContractDialogComponent {...props} />
    </UpdateContractDialogErrorBoundary>
  );
}
