import { Skeleton } from "@/components/ui/skeleton";
export default function AccountIncidentDetailsPageLoading() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <Skeleton className="h-4 w-full max-w-sm" />
      <Skeleton className="h-6 w-full max-w-sm self-center font-bold sm:h-8 md:h-10" />
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <Skeleton className="h-10 w-10 rounded-full sm:hidden" />

        <div className="hidden items-center justify-between gap-2 sm:flex">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
