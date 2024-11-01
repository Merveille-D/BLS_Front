import { CategorySelectComponent } from "./component";
import { CategorySelectErrorBoundary } from "./error";
export default function CategorySelect(props) {
  return (
    <CategorySelectErrorBoundary {...props}>
      <CategorySelectComponent {...props} />
    </CategorySelectErrorBoundary>
  );
}
