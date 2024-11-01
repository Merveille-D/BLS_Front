import { Button } from "@/components/ui/button";
import { RolesPageBreadcrumb } from "@/components/administration/role/breadcrumbs";
import AddRoleDialog from "@/components/administration/role/modals/add-role-dialog";
import { ShieldPlus } from "lucide-react";
import RolesTable from "@/components/administration/role/tables/roles-table";
export default function RolesPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <RolesPageBreadcrumb />
        <AddRoleDialog asChild>
          <Button className="gap-2">
            <ShieldPlus />
            <span className="sr-only sm:not-sr-only">Nouveau rôle</span>
          </Button>
        </AddRoleDialog>
      </div>
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        Gestion des rôles
      </h1>
      <RolesTable />
    </div>
  );
}
