import { UserSelectComponent } from "./component";
import { UserSelectErrorBoundary } from "./error";
export default function UserSelect(props) {
  return (
    <UserSelectErrorBoundary {...props}>
      <UserSelectComponent {...props} />
    </UserSelectErrorBoundary>
  );
}
