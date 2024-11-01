import Link from "next/link";
import { LegalMonitoringRoutes } from "@/config/routes";
import { Newspaper, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddLegislativeItemDialog from "@/components/legal-monitoring/modals/add-legislative-item-dialog";
import { LegislativePageBreadcrumb } from "@/components/legal-monitoring/breadcrumbs/legislative-page-breadcrumb";
import LegislativeItemsList from "@/components/legal-monitoring/ui/legislative-items-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function LegislativePage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <LegislativePageBreadcrumb />
          <div className="flex items-center justify-end gap-2">
            <AddLegislativeItemDialog asChild>
              <Button className="gap-2">
                <Scale />
                <span className="sr-only sm:not-sr-only">
                  Nouvelle loi / règlement
                </span>
              </Button>
            </AddLegislativeItemDialog>
            <Button
              asChild
              className="gap-2"
            >
              <Link href={LegalMonitoringRoutes.judicialList}>
                <Newspaper />
                <span className="sr-only sm:not-sr-only">
                  Consulter les affaires
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir un texte normatif
        </h1>
        <LegislativeItemsList />
      </div>
    </SearchProvider>
  );
}
