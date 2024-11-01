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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import RenewMandateDialog from "@/components/governance/administration-meeting/modals/renew-mandate-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Repeat } from "lucide-react";
import { UpdateMandateDialog } from "@/components/governance/administration-meeting/modals/update-mandate-dialog";
const getStatusLabel = (status) => {
  switch (status) {
    case "active":
      return "En cours";
    case "expired":
      return "Terminé";
    default:
      return "";
  }
};
export default function MandatesDialog({
  administratorId,
  mandates,
  ...props
}) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="flex max-h-screen max-w-xl flex-col">
        <DialogHeader>
          <DialogTitle>Historique des mandats</DialogTitle>
          <DialogDescription>Historique des mandats</DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-5 overflow-auto">
          {mandates?.map(
            ({ id, startDate, endDate, renewalDate, status }, index) => (
              <Card key={id}>
                <CardHeader className="flex-row items-center justify-between">
                  <Badge
                    className={cn({
                      "bg-primary text-primary-foreground": status === "active",
                      "bg-muted text-muted-foreground": status === "expired",
                    })}
                  >
                    {getStatusLabel(status)}
                  </Badge>
                  {index === 0 && (
                    <div className="flex items-center">
                      {status === "expired" && (
                        <Tooltip>
                          <RenewMandateDialog
                            asChild
                            administratorId={administratorId}
                            defaultRenewalDate={
                              index > 0
                                ? mandates[index - 1].renewalDate
                                : undefined
                            }
                          >
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                              >
                                <Repeat size={16} />
                              </Button>
                            </TooltipTrigger>
                          </RenewMandateDialog>
                          <TooltipContent>Renouveler</TooltipContent>
                        </Tooltip>
                      )}

                      <Tooltip>
                        <UpdateMandateDialog
                          asChild
                          mandateId={id}
                        >
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="rounded-full"
                            >
                              <Pencil size={16} />
                            </Button>
                          </TooltipTrigger>
                        </UpdateMandateDialog>
                        <TooltipContent>Modifier</TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between gap-5">
                    <span className="font-semibold">Début de mandat</span>
                    <span className="italic text-muted-foreground">
                      {formatDate(startDate)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <span className="font-semibold">Fin de mandat</span>
                    <span className="italic text-muted-foreground">
                      {formatDate(endDate)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <span className="font-semibold">
                      Renouvellement de mandat
                    </span>
                    <span className="italic text-muted-foreground">
                      {formatDate(renewalDate)}
                    </span>
                  </div>
                </CardContent>
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
