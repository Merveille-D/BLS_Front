import { MultipleFileInput } from "@/components/ui/multiple-file-input";
import { cn } from "@/lib/utils";
export function FilesField({ className, ...field }) {
  return (
    <MultipleFileInput
      {...field}
      className={cn("h-12", className)}
    />
  );
}
