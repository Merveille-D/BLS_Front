import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z
  .object({
    password: z
      .string({ required_error: "Le mot de passe est requis" })
      .min(1, "Le mot de passe est requis"),
    confirmPassword: z
      .string({ required_error: "La confirmation du mot de passe est requise" })
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password"],
  });
export const useResetPasswordForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  return formContext ?? form;
};
