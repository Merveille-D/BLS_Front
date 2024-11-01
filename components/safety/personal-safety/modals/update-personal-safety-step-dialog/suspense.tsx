"use client";
import { Skeleton } from "@/components/ui/skeleton";
export function UpdatePersonalSafetyStepDialogSuspense() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="space-y-2"
        >
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}
