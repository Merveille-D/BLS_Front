import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PersonalSafetyRoutes } from "@/config/routes";
import { HomePageBreadcrumb } from "@/components/safety/personal-safety/breadcrumbs";
import CreatePersonalSafetyCard from "@/components/safety/personal-safety/ui/create-personal-safety-card";
export default function PersonalSafetyPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <Button
          asChild
          className="gap-2"
        >
          <Link href={PersonalSafetyRoutes.personalSafetiesList}>
            <FolderSearch />
            Consulter les sûretés personnelles
          </Link>
        </Button>
      </div>
      <CreatePersonalSafetyCard />
    </div>
  );
}
