import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";
export function SharesInfosCardSuspense({ className }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="relative gap-3">
        <Skeleton className="h-16 w-48 self-center" />
        <Skeleton className="absolute right-5 top-5 h-10 w-10 rounded-full text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-10">
        {Array.from({ length: 3 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <div className="flex items-center justify-between gap-5">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between gap-5">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
