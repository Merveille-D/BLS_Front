import { UsersPageBreadcrumb } from "@/components/administration/user/breadcrumbs";
import UsersTable from "@/components/administration/user/tables/users-table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import AddUserDialog from "@/components/administration/user/modals/add-user-dialog";
export default function UsersPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <UsersPageBreadcrumb />
        <AddUserDialog asChild>
          <Button className="gap-2">
            <UserPlus />
            <span className="sr-only sm:not-sr-only">Nouvel utilisateur</span>
          </Button>
        </AddUserDialog>
      </div>
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        Gestion des utilisateurs
      </h1>
      <UsersTable />
    </div>
  );
}
