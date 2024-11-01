import Link from "next/link";
import { TextsBankRoutes } from "@/config/routes";
import { LinkIcon, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinksPageBreadcrumb } from "@/components/texts-bank/breadcrumbs/links-page-breadcrumb";
import {
  LinkItemsList,
  LinkItemsListErrorBoundary,
} from "@/components/texts-bank/ui/link-items-list";
import AddLinkItemDialog from "@/components/texts-bank/modals/add-link-item-dialog";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function LinksPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <LinksPageBreadcrumb />
          <div className="flex items-center justify-end gap-2">
            <AddLinkItemDialog asChild>
              <Button className="gap-2">
                <LinkIcon />
                <span className="sr-only sm:not-sr-only">Nouveau lien</span>
              </Button>
            </AddLinkItemDialog>
            <Button
              asChild
              className="gap-2"
            >
              <Link href={TextsBankRoutes.textsList}>
                <Newspaper />
                <span className="sr-only sm:not-sr-only">
                  Consulter les textes
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir un lien
        </h1>
        <LinkItemsListErrorBoundary>
          <LinkItemsList />
        </LinkItemsListErrorBoundary>
      </div>
    </SearchProvider>
  );
}
