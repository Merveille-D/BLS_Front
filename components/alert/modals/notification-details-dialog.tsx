"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useMemo, useRef } from "react";
import { useMarkAlertAsRead } from "@/services/api-sdk/models/alert/alert";
import { Button } from "@/components/ui/button";
import { Calendar, Info, ShieldAlert, TriangleAlert } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  AccountIncidentRoutes,
  AdministrationMeetingRoutes,
  ContractRoutes,
  GeneralMeetingRoutes,
  LitigationRoutes,
  ManagementCommitteeRoutes,
  MortgageRoutes,
  MovableSafetyRoutes,
  PersonalSafetyRoutes,
  RecoveryRoutes,
} from "@/config/routes";
import Link from "next/link";
const getAlertIcon = (type) => {
  switch (type) {
    case "urgent":
      return (
        <TriangleAlert
          size={30}
          className="float-left fill-destructive text-destructive-foreground"
        />
      );
    case "warning":
      return (
        <ShieldAlert
          size={30}
          className="float-left fill-yellow-500 text-primary-foreground"
        />
      );
    case "info":
      return (
        <Info
          size={30}
          className="float-left fill-blue-500 text-primary-foreground"
        />
      );
    default:
      return (
        <Info
          size={30}
          className="float-left fill-blue-500 text-primary-foreground"
        />
      );
  }
};
export default function NotificationDetailsDialog({
  alertId,
  defaultOpen,
  priority,
  moduleId,
  module,
  title,
  message,
  dueDate,
  ...props
}) {
  const { mutate } = useMarkAlertAsRead(alertId);
  const closeRef = useRef(null);
  const redirectLink = useMemo(() => {
    if (!moduleId) return "#";
    switch (module) {
      case "incident":
        return AccountIncidentRoutes.accountIncidentPage(moduleId).index;
      case "contract":
        return ContractRoutes.contractPage(moduleId).index;
      case "session_administrator":
        return AdministrationMeetingRoutes.session(moduleId).index;
      case "general_meeting":
        return GeneralMeetingRoutes.session(moduleId).index;
      case "management_committee":
        return ManagementCommitteeRoutes.session(moduleId).index;
      case "litigation":
        return LitigationRoutes.litigationPage(moduleId).index;
      case "recovery":
        return RecoveryRoutes.recoveryPage(moduleId).index;
      case "property":
        return MortgageRoutes.mortgagePage(moduleId).index;
      case "pledge":
        return MovableSafetyRoutes.movableSafetyPage(moduleId).index;
      case "personal":
        return PersonalSafetyRoutes.personalSafetyPage(moduleId).index;
      default:
        return "#";
    }
  }, [moduleId, module]);
  return (
    <Dialog
      defaultOpen={defaultOpen}
      onOpenChange={(open) => {
        if (!open) mutate();
      }}
    >
      <DialogTrigger {...props} />
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getAlertIcon(priority)}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl text-destructive">
            <Calendar size={30} />
            {formatDate(dueDate)}
          </div>
        </DialogHeader>
        <p>
          <p className="text-lg italic text-accent-foreground">{message}</p>
        </p>
        <DialogFooter className="gap-2">
          <DialogClose ref={closeRef} />
          <DialogClose asChild>
            <Button className="bg-muted text-muted-foreground hover:bg-muted/90">
              Me le rappeler plus tard
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button asChild>
              <Link href={redirectLink}>Voir le dossier</Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
