import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  email: z
    .string({
      required_error: "L'identifiant est requis",
    })
    .min(1, "L'identifiant est requis"),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(1, "Le mot de passe est requis"),
});
export const useLoginForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return formContext ?? form;
};
