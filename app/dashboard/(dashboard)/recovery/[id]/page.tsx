"use client";
import { EllipsisVertical, Files, GanttChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notFound } from "next/navigation";
import { useOneRecovery } from "@/services/api-sdk/models/recovery";
import { RecoveryDetailsPageBreadcrumb } from "@/components/recovery/breadcrumbs";
import RecoveryStepsTimelineModal from "@/components/recovery/modals/recovery-steps-timeline-modal";
import RecoveryFilesModal from "@/components/recovery/modals/recovery-files-modal";
import { RecoveryDetailsTable } from "@/components/recovery/tables/recovery-details-table";
import RecoveryDetailsPageLoading from "./loading";
export default function RecoveryDetailsPage({ params: { id } }) {
  const { data, isLoading, isError } = useOneRecovery(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <RecoveryDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <RecoveryDetailsPageBreadcrumb recoveryTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>
      {!!data.guaranteeId || (
        <div className="flex flex-row items-center justify-between gap-2">
          <RecoveryStepsTimelineModal
            asChild
            recoveryId={id}
            recoveryTitle={data.title}
            nextStepId={data.nextStep?.id}
          >
            <Button
              aria-label="Planification du recouvrement"
              className="gap-2"
            >
              <GanttChart />
              Planifier
            </Button>
          </RecoveryStepsTimelineModal>

          <DropdownMenu>
            <Tooltip>
              <DropdownMenuTrigger
                asChild
                className="cursor-pointer sm:hidden"
              >
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Menu"
                    className="gap-2 rounded-full"
                  >
                    <EllipsisVertical size={30} />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Menu</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <RecoveryFilesModal
                asChild
                recoveryId={id}
                recoveryTitle={data.title}
              >
                <DropdownMenuItem
                  className="cursor-pointer gap-2 sm:hidden"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Files />
                  Archives
                </DropdownMenuItem>
              </RecoveryFilesModal>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden items-center justify-between gap-2 sm:flex">
            <Tooltip>
              <RecoveryFilesModal
                asChild
                recoveryId={id}
                recoveryTitle={data.title}
              >
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Archives"
                    className="gap-2 rounded-full"
                  >
                    <Files size={30} />
                  </Button>
                </TooltipTrigger>
              </RecoveryFilesModal>
              <TooltipContent>Archives</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      <RecoveryDetailsTable
        recoveryId={id}
        title={data.title}
        reference={data.reference}
        type={data.type}
        guaranteeId={data.guaranteeId}
        contractId={data.contractId}
        currentStep={data.currentStep}
        nextStep={data.nextStep}
        isArchived={data.isArchived}
      />
    </div>
  );
}
