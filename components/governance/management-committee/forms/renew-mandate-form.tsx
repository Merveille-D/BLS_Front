"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateInput } from "@/components/ui/date-input";
import { useRenewMandate } from "@/services/api-sdk/models/management-committee";
import { useRenewMandateForm } from "@/lib/governance/management-committee/hooks";
export default function RenewMandateForm({
  formId,
  directorId,
  onSuccess,
  onError,
}) {
  const form = useRenewMandateForm();
  const { mutateAsync } = useRenewMandate(directorId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: () => {
          toast({
            description: "Mandat mis à jour avec succès",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la mise à jour du mandat",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <Form {...form}>
      <form
        id={formId}
        className="space-y-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début du mandat</FormLabel>
              <FormControl>
                <DateInput
                  value={field.value}
                  className="h-12"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
