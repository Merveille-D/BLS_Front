import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({ required_error: "Le titre est requis" })
    .min(1, "Le titre est requis"),
  country: z
    .string({ required_error: "Le pays est requis" })
    .min(1, "Le pays est requis"),
  address: z
    .string({ required_error: "L'adresse est requise" })
    .min(1, "L'adresse est requise"),
});
export const useSubsidiaryForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      country: "",
      address: "",
    },
  });
  return formContext ?? form;
};
