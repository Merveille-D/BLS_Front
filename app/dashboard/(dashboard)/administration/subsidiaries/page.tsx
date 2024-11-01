import { Button } from "@/components/ui/button";
import { SubsidiariesPageBreadcrumb } from "@/components/administration/subsidiary/breadcrumbs";
import AddSubsidiaryDialog from "@/components/administration/subsidiary/modals/add-subsidiary-dialog";
import { Landmark } from "lucide-react";
import SubsidiariesTable from "@/components/administration/subsidiary/tables/subsidiaries-table";
export default function SubsidiariesPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <SubsidiariesPageBreadcrumb />
        <AddSubsidiaryDialog asChild>
          <Button className="gap-2">
            <Landmark />
            <span className="sr-only sm:not-sr-only">Nouvelle filiale</span>
          </Button>
        </AddSubsidiaryDialog>
      </div>
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        Gestion des filiales
      </h1>
      <SubsidiariesTable />
    </div>
  );
}
