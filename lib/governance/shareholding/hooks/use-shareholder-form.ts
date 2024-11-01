import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  name: z
    .string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis"),
  nationality: z
    .string({ required_error: "La nationalité est requise" })
    .min(1, "La nationalité est requise"),
  address: z
    .string({ required_error: "L'adresse est requise" })
    .min(1, "L'adresse est requise"),
  encumberedShares: z
    .number({
      required_error: "Le nombre de parts grèvées est requis",
      coerce: true,
    })
    .int({ message: "Le nombre de parts grèvées doit être un entier" })
    .default(0),
  unencumberedShares: z
    .number({
      required_error: "Le nombre de parts non grèvées est requis",
      coerce: true,
    })
    .int({ message: "Le nombre de parts non grèvées doit être un entier" })
    .default(0),
  type: z.enum(["individual", "corporate"], {
    required_error: "Le type est requis",
    invalid_type_error: "Le type est invalide",
  }),
  corporateType: z
    .enum(["company", "institution"], {
      invalid_type_error: "Le type est invalide",
    })
    .optional(),
});
export const useShareholderForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      nationality: "",
      address: "",
      encumberedShares: 0,
      unencumberedShares: 0,
      type: "individual",
      corporateType: undefined,
    },
  });
  return formContext ?? form;
};
