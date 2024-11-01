import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import AddAuditDialog from "@/components/audit/modals/add-audit-dialog";
export default function AuditModuleCard({ className }) {
  return (
    <Card
      className={cn(
        "max-w-96 self-center sm:min-w-96 sm:max-w-[50%]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>Auditer</CardTitle>
        <CardDescription>Auditer un module</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/audit/images/create-audit.svg"
          alt="Auditer"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddAuditDialog asChild>
          <Button className="gap-2">
            <Scale />
            Auditer un module
          </Button>
        </AddAuditDialog>
      </CardFooter>
    </Card>
  );
}
