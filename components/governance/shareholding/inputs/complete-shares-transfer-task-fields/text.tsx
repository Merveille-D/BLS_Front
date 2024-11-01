import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
export function TextField({ className, ...field }) {
  return (
    <Input
      {...field}
      className={cn("h-12", className)}
    />
  );
}
