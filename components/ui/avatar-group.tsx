import { forwardRef } from "react";
import { cn } from "@/lib/utils";
export const AvatarGroup = forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    {...props}
    className={cn(
      "inline-flex items-center [&>*]:border-2 [&>*~*]:-translate-x-1/3 [&>*~*]:shadow",
      className,
    )}
  />
));
AvatarGroup.displayName = "AvatarGroup";
