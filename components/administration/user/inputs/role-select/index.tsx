import { RoleSelectComponent } from "./component";
import { RoleSelectErrorBoundary } from "./error";
export default function RoleSelect(props) {
  return (
    <RoleSelectErrorBoundary {...props}>
      <RoleSelectComponent {...props} />
    </RoleSelectErrorBoundary>
  );
}
