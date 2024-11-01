import { CategoryTypeSelectComponent } from "./component";
import { CategoryTypeSelectErrorBoundary } from "./error";
export default function CategoryTypeSelect({ category, ...props }) {
  return (
    <CategoryTypeSelectErrorBoundary {...props}>
      <CategoryTypeSelectComponent
        category={category}
        {...props}
      />
    </CategoryTypeSelectErrorBoundary>
  );
}
