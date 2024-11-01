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
import { useOnePersonalSafety } from "@/services/api-sdk/models/personal-safety";
import { PersonalSafetyDetailsPageBreadcrumb } from "@/components/safety/personal-safety/breadcrumbs";
import PersonalSafetyStepsTimelineModal from "@/components/safety/personal-safety/modals/personal-safety-steps-timeline-modal";
import PersonalSafetyFilesModal from "@/components/safety/personal-safety/modals/personal-safety-files-modal";
import StartRealisationButton from "@/components/safety/personal-safety/buttons/start-realisation-button";
import { PersonalSafetyDetailsTable } from "@/components/safety/personal-safety/tables/personal-safety-details-table";
import PersonalSafetyDetailsPageLoading from "./loading";
export default function PersonalSafetyDetailsPage({ params: { id } }) {
  const { data, isLoading, isError } = useOnePersonalSafety(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <PersonalSafetyDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <PersonalSafetyDetailsPageBreadcrumb personalSafetyTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>
      <div className="flex flex-row items-center justify-between gap-2">
        <PersonalSafetyStepsTimelineModal
          asChild
          personalSafetyId={id}
          personalSafetyTitle={data.title}
          nextStepId={data.nextStep?.id}
        >
          <Button
            aria-label="Planification de l'hypothèque"
            className="gap-2"
          >
            <GanttChart />
            Planifier
          </Button>
        </PersonalSafetyStepsTimelineModal>

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
            <PersonalSafetyFilesModal
              asChild
              personalSafetyId={id}
              personalSafetyTitle={data.title}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <Files />
                Archives
              </DropdownMenuItem>
            </PersonalSafetyFilesModal>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden items-center justify-between gap-2 sm:flex">
          {data.hasRecovery && data.phase === "formalization" && (
            <StartRealisationButton personalSafetyId={id} />
          )}
          <Tooltip>
            <PersonalSafetyFilesModal
              asChild
              personalSafetyId={id}
              personalSafetyTitle={data.title}
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
            </PersonalSafetyFilesModal>
            <TooltipContent>Archives</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <PersonalSafetyDetailsTable
        personalSafetyId={id}
        title={data.title}
        reference={data.reference}
        type={data.type}
        phase={data.phase}
        contractId={data.contractId}
        currentStep={data.currentStep}
        nextStep={data.nextStep}
      />
    </div>
  );
}
