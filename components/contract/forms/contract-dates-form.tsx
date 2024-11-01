"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateInput } from "@/components/ui/date-input";
import { useContractDatesForm } from "@/lib/contract/hooks/use-contract-dates-form";
import { useCallback, useMemo } from "react";
import { toast } from "@/components/ui/use-toast";
import { usePlanContractDates } from "@/services/api-sdk/models/contract/contract";
export default function ContractDatesForm({
  contractId,
  defaultDate,
  formId,
  dateType,
  onSuccess,
  onError,
}) {
  const form = useContractDatesForm(dateType, defaultDate);
  const { mutateAsync } = usePlanContractDates(contractId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: () => {
          toast({
            description: "Date planifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la planification.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  const label = useMemo(() => {
    switch (dateType) {
      case "signatureDate":
        return "Date de signature du contrat";
      case "effectiveDate":
        return "Date de prise d'effet du contrat";
      case "expirationDate":
        return "Date d'expiration du contrat";
      case "renewalDate":
        return "Date de renouvellement du contrat";
      default:
        return "Date";
    }
  }, [dateType]);
  return (
    <Form {...form}>
      <form
        id={formId}
        className="space-y-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name={dateType}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
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
