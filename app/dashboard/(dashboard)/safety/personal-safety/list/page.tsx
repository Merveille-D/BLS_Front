import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalSafetiesListPageBreadcrumb } from "@/components/safety/personal-safety/breadcrumbs";
import AddPersonalSafetyDialog from "@/components/safety/personal-safety/modals/add-personal-safety-dialog";
import PersonalSafetiesList from "@/components/safety/personal-safety/ui/personal-safeties-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function PersonalSafetiesListPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <PersonalSafetiesListPageBreadcrumb />
          <AddPersonalSafetyDialog asChild>
            <Button className="gap-2">
              <Scale />
              <span className="sr-only sm:not-sr-only">
                Nouvelle sûreté personnelle
              </span>
            </Button>
          </AddPersonalSafetyDialog>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir une sûreté personnelle
        </h1>
        <PersonalSafetiesList />
      </div>
    </SearchProvider>
  );
}
