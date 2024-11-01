"use client";
import { forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";
import { TimelineContext } from "@/components/ui/timeline/timeline-context";
export const TimelineSeparator = forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useContext(TimelineContext);
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "absolute border-2 border-secondary",
        {
          "inset-y-0 left-1/2 -translate-x-1/2": orientation === "vertical",
          "inset-x-0 top-1/2 -translate-y-1/2": orientation === "horizontal",
        },
        className,
      )}
    />
  );
});
TimelineSeparator.displayName = "TimelineSeparator";
