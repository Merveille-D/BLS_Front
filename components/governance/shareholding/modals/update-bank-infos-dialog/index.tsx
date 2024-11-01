import { UpdateBankInfosDialogComponent } from "./component";
import { UpdateBankInfosDialogErrorBoundary } from "./error";
export default function UpdateBankInfosDialog(props) {
  return (
    <UpdateBankInfosDialogErrorBoundary>
      <UpdateBankInfosDialogComponent {...props} />
    </UpdateBankInfosDialogErrorBoundary>
  );
}
