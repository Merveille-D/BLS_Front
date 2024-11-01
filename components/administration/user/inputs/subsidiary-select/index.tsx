import { SubsidiarySelectComponent } from "./component";
import { SubsidiarySelectErrorBoundary } from "./error";
export default function SubsidiarySelect(props) {
  return (
    <SubsidiarySelectErrorBoundary {...props}>
      <SubsidiarySelectComponent {...props} />
    </SubsidiarySelectErrorBoundary>
  );
}
