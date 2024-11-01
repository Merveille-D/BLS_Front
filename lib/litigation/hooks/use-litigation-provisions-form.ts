import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  estimatedAmount: z.number({
    invalid_type_error: "Le montant estimé est invalide",
    coerce: true,
  }),
  addedAmount: z.number({
    invalid_type_error: "Le montant ajouté est invalide",
    coerce: true,
  }),
  remainingAmount: z.number({
    invalid_type_error: "Le montant restant est invalide",
    coerce: true,
  }),
});
export const useLitigationProvisionsForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      estimatedAmount: 0,
      addedAmount: 0,
      remainingAmount: 0,
    },
  });
  return formContext ?? form;
};
