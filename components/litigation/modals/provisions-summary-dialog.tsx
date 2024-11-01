"use client";
import { Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useLitigationProvisionsSummary } from "@/services/api-sdk/models/litigation";
import { formatAmount } from "@/lib/utils";
export default function ProvisionsSummaryDialog(props) {
  const { data, isLoading, isError } = useLitigationProvisionsSummary();
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="flex max-h-screen max-w-lg flex-col">
        <DialogHeader>
          <DialogTitle>Statistique des provisions</DialogTitle>
          <DialogDescription>
            Statistique des provisions de tous les dossiers de contentieux
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-10 overflow-auto">
          {!data && isLoading && (
            <p className="italic text-muted-foreground">
              Chargement des statistiques des provisions...
            </p>
          )}

          {!data && isError && (
            <p className="italic text-destructive">
              Erreur lors du chargement des statistiques des provisions
            </p>
          )}

          {data && (
            <>
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-1 font-semibold">
                  <Banknote />
                  <span>Montant total constitué</span>
                </div>
                <span className="italic text-muted-foreground">
                  {formatAmount(data.totalEstimatedAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-1 font-semibold">
                  <Banknote />
                  <span>Montant total à constituer</span>
                </div>
                <span className="italic text-muted-foreground">
                  {formatAmount(data.totalAddedAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-1 font-semibold">
                  <Banknote />
                  <span>Montant total</span>
                </div>
                <span className="italic text-muted-foreground">
                  {formatAmount(
                    data.totalAddedAmount + data.totalEstimatedAmount,
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-1 font-semibold">
                  <Banknote />
                  <span>Montant total repris</span>
                </div>
                <span className="italic text-muted-foreground">
                  {formatAmount(data.totalRemainingAmount)}
                </span>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
