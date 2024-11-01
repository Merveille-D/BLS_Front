import { LinkIcon, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextsBankRoutes } from "@/config/routes";
import { HomePageBreadcrumb } from "@/components/texts-bank/breadcrumbs/home-page-breadcrumb";
import Link from "next/link";
import CreateLinkItemCard from "@/components/texts-bank/ui/create-link-item-card";
import CreateTextItemCard from "@/components/texts-bank/ui/create-text-item-card";
import CreateOtherDocumentCard from "@/components/texts-bank/ui/create-other-document-card";
export default function TextsBankPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <div className="flex items-center justify-end gap-2">
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

          <Button
            asChild
            className="gap-2"
          >
            <Link href={TextsBankRoutes.otherDocumentsList}>
              <Newspaper />
              <span className="sr-only sm:not-sr-only">
                Consulter les documents
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10">
        <CreateLinkItemCard />
        <CreateTextItemCard />
        <CreateOtherDocumentCard />
      </div>
    </div>
  );
}
