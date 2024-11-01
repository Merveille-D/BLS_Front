import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MortgageRoutes } from "@/config/routes";
import { HomePageBreadcrumb } from "@/components/safety/mortgage/breadcrumbs";
import CreateMortgageCard from "@/components/safety/mortgage/ui/create-mortgage-card";
export default function MortgagePage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <Button
          asChild
          className="gap-2"
        >
          <Link href={MortgageRoutes.mortgagesList}>
            <FolderSearch />
            Consulter les hypothèques
          </Link>
        </Button>
      </div>
      <CreateMortgageCard />
    </div>
  );
}
