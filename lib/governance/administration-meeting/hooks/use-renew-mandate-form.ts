import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  startDate: z.date({
    required_error: "La date de début du mandat est requise",
  }),
});
export const useRenewMandateForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      startDate: new Date(),
    },
  });
  return formContext ?? form;
};
