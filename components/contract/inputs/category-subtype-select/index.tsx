import React from "react";
import { CategorySubTypeSelectComponent } from "./component";
import { CategorySubTypeSelectErrorBoundary } from "./error";
export default function CategorySubTypeSelect(props) {
  return (
    <CategorySubTypeSelectErrorBoundary {...props}>
      <CategorySubTypeSelectComponent {...props} />
    </CategorySubTypeSelectErrorBoundary>
  );
}
