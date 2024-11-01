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
import { useOneMortgage } from "@/services/api-sdk/models/mortgage";
import { MortgageDetailsPageBreadcrumb } from "@/components/safety/mortgage/breadcrumbs";
import MortgageStepsTimelineModal from "@/components/safety/mortgage/modals/mortgage-steps-timeline-modal";
import MortgageFilesModal from "@/components/safety/mortgage/modals/mortgage-files-modal";
import { MortgageDetailsTable } from "@/components/safety/mortgage/tables/mortgage-details-table";
import StartRealisationButton from "@/components/safety/mortgage/buttons/start-realisation-button";
import MortgageDetailsPageLoading from "./loading";
export default function MortgageDetailsPage({ params: { id } }) {
  const { data, isLoading, isError } = useOneMortgage(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <MortgageDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <MortgageDetailsPageBreadcrumb mortgageTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>
      <div className="flex flex-row items-center justify-between gap-2">
        <MortgageStepsTimelineModal
          asChild
          mortgageId={id}
          mortgageTitle={data.title}
          nextStepId={data.nextStep?.id}
        >
          <Button
            aria-label="Planification de l'hypothèque"
            className="gap-2"
          >
            <GanttChart />
            Planifier
          </Button>
        </MortgageStepsTimelineModal>

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
            <MortgageFilesModal
              asChild
              mortgageId={id}
              mortgageTitle={data.title}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <Files />
                Archives
              </DropdownMenuItem>
            </MortgageFilesModal>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden items-center justify-between gap-2 sm:flex">
          {data.hasRecovery && data.phase === "formalized" && (
            <StartRealisationButton mortgageId={id} />
          )}
          <Tooltip>
            <MortgageFilesModal
              asChild
              mortgageId={id}
              mortgageTitle={data.title}
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
            </MortgageFilesModal>
            <TooltipContent>Archives</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <MortgageDetailsTable
        mortgageId={id}
        title={data.title}
        reference={data.reference}
        phase={data.phase}
        contractId={data.contractId}
        currentStep={data.currentStep}
        nextStep={data.nextStep}
        estateSalePrice={data.estateSalePrice}
      />
    </div>
  );
}
