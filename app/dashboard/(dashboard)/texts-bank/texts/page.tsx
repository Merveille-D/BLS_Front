import Link from "next/link";
import { TextsBankRoutes } from "@/config/routes";
import { LinkIcon, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextsPageBreadcrumb } from "@/components/texts-bank/breadcrumbs/texts-page-breadcrumb";
import {
  TextItemsList,
  TextItemsListErrorBoundary,
} from "@/components/texts-bank/ui/text-items-list";
import AddTextItemDialog from "@/components/texts-bank/modals/add-text-item-dialog";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function TextsPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <TextsPageBreadcrumb />
          <div className="flex items-center justify-end gap-2">
            <AddTextItemDialog asChild>
              <Button className="gap-2">
                <Newspaper />
                <span className="sr-only sm:not-sr-only">Nouveau texte</span>
              </Button>
            </AddTextItemDialog>
            <Button
              asChild
              className="gap-2"
            >
              <Link href={TextsBankRoutes.linksList}>
                <LinkIcon />
                <span className="sr-only sm:not-sr-only">
                  Consulter les liens
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir un texte
        </h1>
        <TextItemsListErrorBoundary>
          <TextItemsList />
        </TextItemsListErrorBoundary>
      </div>
    </SearchProvider>
  );
}
