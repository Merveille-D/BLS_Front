"use client";
import { notFound } from "next/navigation";
import { useOneJudicialItem } from "@/services/api-sdk/models/legal-monitoring/judicial-item";
import { JudicialItemDetailsPageBreadcrumb } from "@/components/legal-monitoring/breadcrumbs/judicial-item-details-page-breadcrumb";
import { JudicialItemDetailsTable } from "@/components/legal-monitoring/tables/judicial-item-details-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JudicialItemDetailsPageLoading from "./loading";
export default function Page({ params: { id } }) {
  const { data, isLoading, isError } = useOneJudicialItem(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <JudicialItemDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <JudicialItemDetailsPageBreadcrumb itemTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>

      <JudicialItemDetailsTable
        itemId={data.id}
        reference={data.reference}
        title={data.title}
        isArchived={data.isArchived}
        jurisdiction={data.jurisdiction}
        jurisdictionLocation={data.jurisdictionLocation}
        eventDate={data.eventDate}
        mail={data.mail}
      />

      <Accordion
        type="single"
        collapsible
        className="contents"
      >
        <AccordionItem
          value="summary"
          className="border"
        >
          <AccordionTrigger className="px-4 data-[state=open]:border-b">
            Résumé de l&apos;affaire
          </AccordionTrigger>
          <AccordionContent className="bg-card p-4">
            {data.summary}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="innovation"
          className="border"
        >
          <AccordionTrigger className="px-4 data-[state=open]:border-b">
            Innovation
          </AccordionTrigger>
          <AccordionContent className="bg-card p-4">
            {data.innovation}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
