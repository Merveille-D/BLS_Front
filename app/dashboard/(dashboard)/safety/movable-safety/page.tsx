import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MovableSafetyRoutes } from "@/config/routes";
import { HomePageBreadcrumb } from "@/components/safety/movable-safety/breadcrumbs";
import CreateMovableSafetyCard from "@/components/safety/movable-safety/ui/create-movable-safety-card";
export default function MovableSafetyPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <Button
          asChild
          className="gap-2"
        >
          <Link href={MovableSafetyRoutes.movableSafetiesList}>
            <FolderSearch />
            Consulter les sûretés mobilières
          </Link>
        </Button>
      </div>
      <CreateMovableSafetyCard />
    </div>
  );
}
