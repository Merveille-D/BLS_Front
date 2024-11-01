import { StakeholderNameSpanComponent } from "./component";
import { StakeholderNameSpanErrorBoundary } from "./error";
export default function StakeholderNameSpan({ className, ...props }) {
  return (
    <StakeholderNameSpanErrorBoundary className={className}>
      <StakeholderNameSpanComponent
        className={className}
        {...props}
      />
    </StakeholderNameSpanErrorBoundary>
  );
}
