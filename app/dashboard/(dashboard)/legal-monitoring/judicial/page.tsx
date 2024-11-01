import Link from "next/link";
import { LegalMonitoringRoutes } from "@/config/routes";
import { Newspaper, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JudicialPageBreadcrumb } from "@/components/legal-monitoring/breadcrumbs/judicial-page-breadcrumb";
import AddJudicialItemDialog from "@/components/legal-monitoring/modals/add-judicial-item-dialog";
import JudicialItemsList from "@/components/legal-monitoring/ui/judicial-items-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function JudicialPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <JudicialPageBreadcrumb />
          <div className="flex items-center justify-end gap-2">
            <AddJudicialItemDialog asChild>
              <Button className="gap-2">
                <Scale />
                <span className="sr-only sm:not-sr-only">Nouvelle affaire</span>
              </Button>
            </AddJudicialItemDialog>
            <Button
              asChild
              className="gap-2"
            >
              <Link href={LegalMonitoringRoutes.legislativeList}>
                <Newspaper />
                <span className="sr-only sm:not-sr-only">
                  Consulter les lois / règlements
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir une affaire
        </h1>
        <JudicialItemsList />
      </div>
    </SearchProvider>
  );
}
