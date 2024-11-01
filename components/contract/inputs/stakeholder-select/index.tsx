import { StakeholderSelectComponent } from "./component";
import { StakeholderSelectErrorBoundary } from "./error";
export default function StakeholderSelect(props) {
  return (
    <StakeholderSelectErrorBoundary {...props}>
      <StakeholderSelectComponent {...props} />
    </StakeholderSelectErrorBoundary>
  );
}
