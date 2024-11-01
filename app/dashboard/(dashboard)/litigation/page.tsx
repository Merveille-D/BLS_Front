import { BarChart3, FolderSearch, HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LitigationRoutes } from "@/config/routes";
import { HomePageBreadcrumb } from "@/components/litigation/breadcrumbs";
import CreateLitigationCard from "@/components/litigation/ui/create-litigation-card";
import UnsuppliedLitigationDialog from "@/components/litigation/modals/unsupplied-litigation-dialog";
import ProvisionsSummaryDialog from "@/components/litigation/modals/provisions-summary-dialog";
export default function LitigationPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <div className="flex flex-col justify-end gap-2 sm:flex-row sm:items-center">
          <UnsuppliedLitigationDialog asChild>
            <Button
              variant="destructive"
              className="gap-2"
            >
              <HandCoins />
              Dossiers à provisionner
            </Button>
          </UnsuppliedLitigationDialog>

          <Button
            asChild
            className="gap-2"
          >
            <Link href={LitigationRoutes.litigationList}>
              <FolderSearch />
              Consulter les contentieux
            </Link>
          </Button>

          <ProvisionsSummaryDialog asChild>
            <Button variant="ghost">
              <BarChart3 />
            </Button>
          </ProvisionsSummaryDialog>
        </div>
      </div>
      <CreateLitigationCard />
    </div>
  );
}
