import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export function LinkItemsListSuspense() {
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="w-72 sm:w-80"
        >
          <CardHeader className="pb-0">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardFooter className="flex items-center justify-end gap-1">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
