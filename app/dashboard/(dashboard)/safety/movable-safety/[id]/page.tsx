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
import { useOneMovableSafety } from "@/services/api-sdk/models/movable-safety";
import { MovableSafetyDetailsPageBreadcrumb } from "@/components/safety/movable-safety/breadcrumbs";
import MovableSafetyStepsTimelineModal from "@/components/safety/movable-safety/modals/movable-safety-steps-timeline-modal";
import MovableSafetyFilesModal from "@/components/safety/movable-safety/modals/movable-safety-files-modal";
import StartRealisationButton from "@/components/safety/movable-safety/buttons/start-realisation-button";
import { MovableSafetyDetailsTable } from "@/components/safety/movable-safety/tables/movable-safety-details-table";
import MovableSafetyDetailsPageLoading from "./loading";
export default function MovableSafetyDetailsPage({ params: { id } }) {
  const { data, isLoading, isError } = useOneMovableSafety(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <MovableSafetyDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <MovableSafetyDetailsPageBreadcrumb movableSafetyTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>
      <div className="flex flex-row items-center justify-between gap-2">
        <MovableSafetyStepsTimelineModal
          asChild
          movableSafetyId={id}
          movableSafetyTitle={data.title}
          nextStepId={data.nextStep?.id}
        >
          <Button
            aria-label="Planification de l'hypothèque"
            className="gap-2"
          >
            <GanttChart />
            Planifier
          </Button>
        </MovableSafetyStepsTimelineModal>

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
            <MovableSafetyFilesModal
              asChild
              movableSafetyId={id}
              movableSafetyTitle={data.title}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <Files />
                Archives
              </DropdownMenuItem>
            </MovableSafetyFilesModal>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden items-center justify-between gap-2 sm:flex">
          {data.hasRecovery && data.phase === "formalization" && (
            <StartRealisationButton movableSafetyId={id} />
          )}
          <Tooltip>
            <MovableSafetyFilesModal
              asChild
              movableSafetyId={id}
              movableSafetyTitle={data.title}
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
            </MovableSafetyFilesModal>
            <TooltipContent>Archives</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <MovableSafetyDetailsTable
        movableSafetyId={id}
        title={data.title}
        reference={data.reference}
        security={data.security}
        type={data.type}
        phase={data.phase}
        contractId={data.contractId}
        currentStep={data.currentStep}
        nextStep={data.nextStep}
      />
    </div>
  );
}
