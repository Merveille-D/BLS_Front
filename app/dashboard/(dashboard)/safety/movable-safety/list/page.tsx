import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovableSafetiesListPageBreadcrumb } from "@/components/safety/movable-safety/breadcrumbs";
import AddMovableSafetyDialog from "@/components/safety/movable-safety/modals/add-movable-safety-dialog";
import MovableSafetiesList from "@/components/safety/movable-safety/ui/movable-safeties-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function MovableSafetiesListPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <MovableSafetiesListPageBreadcrumb />
          <AddMovableSafetyDialog asChild>
            <Button className="gap-2">
              <Scale />
              <span className="sr-only sm:not-sr-only">
                Nouvelle sûreté mobilière
              </span>
            </Button>
          </AddMovableSafetyDialog>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir une sûreté mobilière
        </h1>
        <MovableSafetiesList />
      </div>
    </SearchProvider>
  );
}
