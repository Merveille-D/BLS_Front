import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  name: z
    .string({
      required_error: "Le nom est requis",
    })
    .min(1, "Le nom est requis"),
  email: z
    .string({
      required_error: "L'email est requis",
    })
    .email("Adresse email invalide"),
  phone: z
    .string({
      required_error: "Le téléphone est requis",
    })
    .min(1, "Le téléphone est requis"),
});
export const useIncidentAuthorForm = (options) => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  if (options?.noContext) return newForm;
  return formContext ?? newForm;
};
