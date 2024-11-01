import { cn } from "@/lib/utils";
import { NumberInput } from "@/components/ui/number-input";
export function NumberField({ className, ...field }) {
  return (
    <NumberInput
      {...field}
      className={cn("h-12", className)}
    />
  );
}
