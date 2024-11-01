import * as React from "react";
import { cn } from "@/lib/utils";
const MultipleFileInput = React.forwardRef(
  ({ className, value, placeholder, disabled, onChange, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "flex h-10 w-full cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <input
        type="file"
        className="sr-only"
        multiple
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.files)}
      />
      {value?.length ? (
        <span className="text-muted-foreground">
          {value.length} fichier{value.length > 1 ? "s" : ""} sélectionné
          {value.length > 1 ? "s" : ""}
        </span>
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
    </label>
  ),
);
MultipleFileInput.displayName = "MultipleFileInput";
export { MultipleFileInput };
