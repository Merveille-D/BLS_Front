import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuditModulesListPageBreadcrumb } from "@/components/audit/breadcrumbs";
import Link from "next/link";
import { AuditRoutes } from "@/config/routes/audit";
import AuditsList from "@/components/audit/ui/audits-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function ModulesListPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <AuditModulesListPageBreadcrumb />
          <Button
            asChild
            className="gap-2"
          >
            <Link href={AuditRoutes.auditModulesList}>
              <Scale />
              <span className="sr-only sm:not-sr-only">Gérer les modules</span>
            </Link>
          </Button>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir un audit
        </h1>
        <AuditsList />
      </div>
    </SearchProvider>
  );
}
