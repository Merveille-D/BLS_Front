import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  nationality: z
    .string({ required_error: "La nationalité est requise" })
    .min(1, "La nationalité est requise"),
  address: z
    .string({ required_error: "L'adresse est requise" })
    .min(1, "L'adresse est requise"),
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
export const useApproveSharesTransferForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nationality: "",
      address: "",
      type: "individual",
      corporateType: undefined,
    },
  });
  return formContext ?? form;
};
