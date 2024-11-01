"use client";
import { FolderSearch, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdministrationMeetingRoutes } from "@/config/routes";
import {
  CurrentAdministrationMeetingView,
  CurrentAdministrationMeetingViewErrorBoundary,
} from "@/components/governance/administration-meeting/ui/current-administration-meeting-view";
import { AdministrationMeetingPageBreadcrumb } from "@/components/governance/administration-meeting/breadcrumbs";
import AdministratorsModal from "@/components/governance/administration-meeting/modals/administrators-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdministratorsMandatesModal from "@/components/governance/administration-meeting/modals/administrators-mandates-modal";
export default function AdministrationMeetingPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <AdministrationMeetingPageBreadcrumb />
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="gap-2"
              >
                <Users />
                Voir les administrateurs
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <AdministratorsModal asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                  Liste des administrateurs
                </DropdownMenuItem>
              </AdministratorsModal>

              <AdministratorsMandatesModal asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                  Gestion des mandats
                </DropdownMenuItem>
              </AdministratorsMandatesModal>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            className="gap-2"
          >
            <Link href={AdministrationMeetingRoutes.archives}>
              <FolderSearch />
              Consulter les archives
            </Link>
          </Button>
        </div>
      </div>
      <CurrentAdministrationMeetingViewErrorBoundary>
        <CurrentAdministrationMeetingView />
      </CurrentAdministrationMeetingViewErrorBoundary>
    </div>
  );
}
