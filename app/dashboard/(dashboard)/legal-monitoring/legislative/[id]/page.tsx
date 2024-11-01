"use client";
import { notFound } from "next/navigation";
import { LegislativeItemDetailsPageBreadcrumb } from "@/components/legal-monitoring/breadcrumbs/legislative-item-details-page-breadcrumb";
import { LegislativeItemDetailsTable } from "@/components/legal-monitoring/tables/legislative-item-details-table";
import { useOneLegislativeItem } from "@/services/api-sdk/models/legal-monitoring/legislative-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MailViewer } from "@/components/ui/mail-viewer";
import LegislativeItemDetailsPageLoading from "./loading";
export default function Page({ params: { id } }) {
  const { data, isLoading, isError } = useOneLegislativeItem(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <LegislativeItemDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <LegislativeItemDetailsPageBreadcrumb itemTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>

      <LegislativeItemDetailsTable
        itemId={data.id}
        title={data.title}
        caseNumber={data.caseNumber}
        reference={data.reference}
        type={data.type}
        isArchived={data.isArchived}
        nature={data.nature}
        effectiveDate={data.effectiveDate}
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

        {data.mail && (
          <AccordionItem
            value="mail"
            className="border"
          >
            <AccordionTrigger className="px-4 data-[state=open]:border-b">
              <div>
                Email: <span className="font-normal">{data.mail.subject}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-card p-4">
              <MailViewer
                mail={{
                  subject: data.mail.subject,
                  from: {
                    name: "AfrikSkills",
                    email: "afrikskills@yopmail.com",
                  },
                  to: data.mail.addresses.map((address) => ({
                    name: address,
                    email: address,
                  })),
                  content: data.mail.content,
                }}
              />
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
