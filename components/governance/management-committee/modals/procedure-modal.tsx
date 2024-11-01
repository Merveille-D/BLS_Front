import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProcedureTable from "@/components/governance/management-committee/tables/procedure-table";
import PrintProceduresButton from "@/components/governance/management-committee/buttons/print-procedures-button";
export default function ProcedureModal({ meetingId, ...props }) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="max-h-screen max-w-md">
        <DialogHeader>
          <DialogTitle>Procédures</DialogTitle>
          <DialogDescription>
            Voici la liste des choses à faire pour tenir la CODIR
          </DialogDescription>
        </DialogHeader>
        <ProcedureTable
          meetingId={meetingId}
          tableWrapperClassName="max-h-80 overflow-auto sm:max-h-96"
        />
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="destructive">Fermer</Button>
          </DialogClose>
          <PrintProceduresButton meetingId={meetingId}>
            Générer la liste
          </PrintProceduresButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
