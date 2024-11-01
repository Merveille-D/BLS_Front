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
import React from "react";
import { Button } from "@/components/ui/button";
import { useUnSuppliedLitigation } from "@/services/api-sdk/models/litigation";
import LitigationCard from "@/components/litigation/ui/litigation-card";
export default function UnsuppliedLitigationDialog(props) {
  const { data } = useUnSuppliedLitigation();
  return (
    data &&
    data.length > 0 && (
      <Dialog>
        <DialogTrigger {...props} />
        <DialogContent className="flex max-h-screen max-w-lg flex-col">
          <DialogHeader>
            <DialogTitle>Dossiers non provisionnés</DialogTitle>
            <DialogDescription>
              Liste des dossiers non provisionnés
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 space-y-5 overflow-auto">
            {data?.map(
              ({
                id,
                title,
                caseNumber,
                reference,
                nature,
                jurisdiction,
                isArchived,
              }) => (
                <LitigationCard
                  key={id}
                  litigationId={id}
                  title={title}
                  caseNumber={caseNumber}
                  reference={reference}
                  nature={nature.title}
                  jurisdiction={jurisdiction.title}
                  isArchived={isArchived}
                />
              ),
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Fermer</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
