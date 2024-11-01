import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddMortgageDialog from "@/components/safety/mortgage/modals/add-mortgage-dialog";
import MortgagesList from "@/components/safety/mortgage/ui/mortgages-list";
import { MortgagesListPageBreadcrumb } from "@/components/safety/mortgage/breadcrumbs";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function MortgagesListPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <MortgagesListPageBreadcrumb />
          <AddMortgageDialog asChild>
            <Button className="gap-2">
              <Scale />
              <span className="sr-only sm:not-sr-only">
                Nouvelle hypothèque
              </span>
            </Button>
          </AddMortgageDialog>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir une hypothèque
        </h1>
        <MortgagesList />
      </div>
    </SearchProvider>
  );
}
