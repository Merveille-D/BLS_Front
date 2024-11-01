import { Newspaper, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LegalMonitoringRoutes } from "@/config/routes";
import Link from "next/link";
import { HomePageBreadcrumb } from "@/components/legal-monitoring/breadcrumbs/home-page-breadcrumb";
import CreateJudicialItemCard from "@/components/legal-monitoring/ui/create-judicial-item-card";
import CreateLegislativeItemCard from "@/components/legal-monitoring/ui/create-legislative-item-card";
export default function LegalMonitoringPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <div className="flex items-center justify-end gap-2">
          <Button
            asChild
            className="gap-2"
          >
            <Link href={LegalMonitoringRoutes.judicialList}>
              <Scale />
              <span className="sr-only sm:not-sr-only">
                Consulter affaires judiciaires
              </span>
            </Link>
          </Button>
          <Button
            asChild
            className="gap-2"
          >
            <Link href={LegalMonitoringRoutes.legislativeList}>
              <Newspaper />
              <span className="sr-only sm:not-sr-only">
                Consulter les textes normatifs
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
        <CreateJudicialItemCard />
        <span className="sr-only text-lg text-foreground/50 md:not-sr-only">
          ou
        </span>
        <CreateLegislativeItemCard />
      </div>
    </div>
  );
}
