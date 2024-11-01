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
import React from "react";
import AdministratorsTable from "@/components/governance/administration-meeting/tables/administrators-table";
export default function AdministratorsModal(props) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="max-h-screen max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Liste des administrateurs</DialogTitle>
          <DialogDescription>
            Liste de tous les administrateurs.
          </DialogDescription>
        </DialogHeader>
        <AdministratorsTable tableWrapperClassName="max-h-80 overflow-auto sm:max-h-96" />
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="destructive">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
