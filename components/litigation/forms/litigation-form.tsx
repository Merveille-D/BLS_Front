"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { useLitigationForm } from "@/lib/litigation/hooks";
import { cn } from "@/lib/utils";
import LitigationPartiesSectionForm from "@/components/litigation/forms/litigation-parties-section-form";
import DocumentsForm from "@/components/ui/documents-form";
import LitigationNatureSelect from "@/components/litigation/inputs/litigation-nature-select";
import JurisdictionSelect from "@/components/litigation/inputs/jurisdiction-select";
import { Checkbox } from "@/components/ui/checkbox";
export default function LitigationForm({ formId, className, onSubmit }) {
  const { form, filesArray, partiesArray } = useLitigationForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-x-5 gap-y-10", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="natureId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Matière</FormLabel>
              <FormControl>
                <div className="relative">
                  <LitigationNatureSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Intitulé de l&apos;affaire</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Intitulé de l'affaire"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caseNumber"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Numéro de dossier</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Numéro de dossier"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jurisdictionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Juridiction</FormLabel>
              <FormControl>
                <div className="relative">
                  <JurisdictionSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jurisdictionLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de la juridiction</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Lieu de la juridiction"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasProvisions"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormLabel className="text-md">A provisionner ?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LitigationPartiesSectionForm
          label="Parties"
          fieldName="parties"
          form={form}
          fieldArray={partiesArray}
        />

        <DocumentsForm
          label="Documents"
          fieldName="files"
          form={form}
          fieldArray={filesArray}
          className="col-span-2"
        />
      </form>
    </Form>
  );
}
