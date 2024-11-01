import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  contractId: z
    .string({
      required_error: "Le contrat est requis",
    })
    .min(1, "Le contrat est requis"),
});
export const useMortgageForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      contractId: undefined,
    },
  });
  return formContext ?? newForm;
};
