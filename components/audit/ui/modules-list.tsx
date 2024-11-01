import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ManageModuleDialog from "@/components/audit/modals/manage-module-dialog";
import { auditModules } from "@/services/api-sdk/types/audit";
export default function ModulesList() {
  return (
    <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 md:grid-cols-3">
      {auditModules.map(({ value, labels: { singular: label } }) => (
        <ManageModuleDialog
          asChild
          key={value}
          defaultModule={value}
        >
          <Card className="h-full cursor-pointer bg-primary text-primary-foreground">
            <CardHeader className="h-full items-center justify-center">
              <CardTitle className="text-center">{label}</CardTitle>
            </CardHeader>
          </Card>
        </ManageModuleDialog>
      ))}
    </div>
  );
}
