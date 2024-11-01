"use client";
import { Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
export function CollaboratorsViewSuspense({ label, className }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 rounded-xl border-2 p-5",
        className,
      )}
    >
      {label && (
        <span className="absolute left-3 top-0 -translate-y-1/2 bg-background px-2 text-sm font-semibold">
          {label}
        </span>
      )}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="flex gap-5"
        >
          <div className="flex-1 space-y-2">
            <span className="text-sm italic text-muted-foreground">
              Critère
            </span>
            <div className="flex items-center gap-2">
              <User className="flex-shrink-0" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <span className="text-sm italic text-muted-foreground">
              Note maximale
            </span>
            <div className="flex items-center gap-2">
              <Tag className="flex-shrink-0" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
