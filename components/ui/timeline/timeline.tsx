"use client";
import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { TimelineContext } from "@/components/ui/timeline/timeline-context";
export const timelineVariants = cva(
  "[&>div]:relative [&>div]:flex [&>div]:items-center [&>div]:gap-10 [&>div]:p-5",
  {
    variants: {
      orientation: {
        horizontal: "[&>div]:flex-row [&>div]:w-fit",
        vertical: "min-w-96 max-w-xl [&>div]:flex-col",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);
export const Timeline = forwardRef(
  ({ className, children, orientation, ...props }, ref) => {
    const contextValue = useMemo(
      () => ({ orientation: orientation ?? "vertical" }),
      [orientation],
    );
    return (
      <div
        ref={ref}
        {...props}
        className={cn(timelineVariants({ orientation }), className)}
      >
        <div>
          <TimelineContext.Provider value={contextValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>
    );
  },
);
Timeline.displayName = "Timeline";
