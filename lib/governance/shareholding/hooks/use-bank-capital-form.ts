import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  capital: z
    .number({
      required_error: "Le capital est requis",
      coerce: true,
    })
    .int({ message: "Le capital doit être un entier" }),
  nominalValue: z
    .number({
      required_error: "La valeur nominale est requise",
      coerce: true,
    })
    .int({ message: "La valeur nominale doit être un entier" }),
  date: z.date({
    required_error: "La date est requise",
    message: "La date est invalide",
  }),
});
export const useBankCapitalForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      capital: 0,
      nominalValue: 0,
      date: new Date(),
    },
  });
  return formContext ?? form;
};
