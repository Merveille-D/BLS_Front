"use client";
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
import React, { useRef } from "react";
import AttendantsTable from "@/components/governance/management-committee/tables/attendants-table";
import PrintAttendantsListButton from "@/components/governance/management-committee/buttons/print-attendants-list-button";
export default function AttendantsDialog({ meetingId, ...props }) {
  const closeRef = useRef(null);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="max-h-screen max-w-2xl">
        <DialogHeader>
          <DialogTitle>Liste de présence</DialogTitle>
          <DialogDescription>
            Constituer la liste des personnes présentes au CODIR.
          </DialogDescription>
        </DialogHeader>
        <AttendantsTable
          meetingId={meetingId}
          tableWrapperClassName="max-h-80 overflow-auto sm:max-h-96"
        />
        <DialogFooter className="gap-2">
          <DialogClose ref={closeRef} />
          <DialogClose asChild>
            <Button variant="muted">Annuler</Button>
          </DialogClose>
          <PrintAttendantsListButton meetingId={meetingId}>
            Générer la liste
          </PrintAttendantsListButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
