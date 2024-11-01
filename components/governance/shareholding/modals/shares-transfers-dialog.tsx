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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { useAllSharesTransfers } from "@/services/api-sdk/models/shareholding";
import { Badge } from "@/components/ui/badge";
import { getSharesTransferStatus } from "@/lib/governance/shareholding";
import Link from "next/link";
import { ShareholdingRoutes } from "@/config/routes";
export default function SharesTransfersDialog(props) {
  const { data, isLoading, isError } = useAllSharesTransfers();
  return (
    <Dialog>
      <DialogTrigger
        disabled={!data || data.length === 0}
        {...props}
      />
      <DialogContent className="flex max-h-screen max-w-xl flex-col">
        <DialogHeader>
          <DialogTitle>Historique des transferts</DialogTitle>
          <DialogDescription>Historique des transferts</DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-5 overflow-auto">
          {!data && isLoading && (
            <p className="italic text-muted-foreground">Chargement...</p>
          )}
          {!data && isError && (
            <p className="italic text-destructive">
              Erreur lors du chargement des données
            </p>
          )}
          {data?.map(
            ({ id, seller, buyer, shares, transferDate, status, type }) => (
              <Card key={id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle>
                      {shares} action{shares > 1 && "s"}
                    </CardTitle>
                    <Badge
                      className={cn(
                        "text-nowrap bg-muted text-muted-foreground",
                        {
                          "bg-accent text-accent-foreground":
                            status === "pending",
                          "bg-destructive text-destructive-foreground":
                            status === "rejected",
                          "bg-primary text-primary-foreground":
                            status === "approved",
                          "bg-secondary text-secondary-foreground":
                            status === "validated",
                        },
                      )}
                    >
                      {getSharesTransferStatus(status)}
                    </Badge>
                  </div>
                  <CardDescription className="space-x-5 text-lg">
                    <span className="text-destructive">{seller.name}</span>
                    <MoveRight className="inline" />
                    <span className="text-secondary">{buyer.name}</span>
                  </CardDescription>
                  <div className="flex items-center justify-between gap-2">
                    <CardDescription className="italic">
                      Transféré le {formatDate(transferDate)}
                    </CardDescription>
                    {type === "tier" && (
                      <Button
                        asChild
                        variant="link"
                        className="gap-2 px-0 italic"
                      >
                        <Link
                          href={ShareholdingRoutes.sharesTransferPage(id).index}
                        >
                          Voir details <MoveRight />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
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
  );
}
