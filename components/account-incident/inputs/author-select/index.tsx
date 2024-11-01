import { AuthorSelectComponent } from "./component";
import { AuthorSelectErrorBoundary } from "./error";
export default function AuthorSelect(props) {
  return (
    <AuthorSelectErrorBoundary {...props}>
      <AuthorSelectComponent {...props} />
    </AuthorSelectErrorBoundary>
  );
}
