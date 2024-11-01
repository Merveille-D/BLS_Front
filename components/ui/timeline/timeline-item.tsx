"use client";
import { forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";
import { TimelineContext } from "@/components/ui/timeline/timeline-context";
export const TimelineItem = forwardRef(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useContext(TimelineContext);
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative grid w-full gap-10",
          {
            "grid-cols-2": orientation === "vertical",
            "grid-rows-2": orientation === "horizontal",
          },
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
TimelineItem.displayName = "TimelineItem";
