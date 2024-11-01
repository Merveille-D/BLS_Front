import { forwardRef } from "react";
import { cn } from "@/lib/utils";
export const TimelineHead = forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        "place-center col-span-2 flex h-24 w-24 origin-top-left translate-x-1/2 rotate-45 items-center justify-center rounded-md bg-muted text-muted-foreground",
        className,
      )}
    >
      <div className="-rotate-45 text-center">{children}</div>
    </div>
  ),
);
TimelineHead.displayName = "TimelineHead";
