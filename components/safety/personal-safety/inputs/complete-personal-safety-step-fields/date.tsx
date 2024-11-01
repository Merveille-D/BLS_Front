import { DateInput } from "@/components/ui/date-input";
import { cn } from "@/lib/utils";
export function DateField({ className, ...field }) {
  return (
    <DateInput
      {...field}
      className={cn("h-12", className)}
    />
  );
}
