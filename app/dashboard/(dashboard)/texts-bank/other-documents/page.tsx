import Link from "next/link";
import { TextsBankRoutes } from "@/config/routes";
import { LinkIcon, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OtherDocumentsPageBreadcrumb } from "@/components/texts-bank/breadcrumbs/other-documents-page-breadcrumb";
import AddOtherDocumentDialog from "@/components/texts-bank/modals/add-other-document-dialog";
import {
  OtherDocumentsList,
  OtherDocumentsListErrorBoundary,
} from "@/components/texts-bank/ui/other-documents-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function OtherDocumentsPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <OtherDocumentsPageBreadcrumb />
          <div className="flex items-center justify-end gap-2">
            <AddOtherDocumentDialog asChild>
              <Button className="gap-2">
                <Newspaper />
                <span className="sr-only sm:not-sr-only">Nouveau document</span>
              </Button>
            </AddOtherDocumentDialog>
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
          Choisir un document
        </h1>
        <OtherDocumentsListErrorBoundary>
          <OtherDocumentsList />
        </OtherDocumentsListErrorBoundary>
      </div>
    </SearchProvider>
  );
}
