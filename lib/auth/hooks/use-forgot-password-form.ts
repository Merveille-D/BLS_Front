import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  email: z
    .string({
      required_error: "L'identifiant est requis",
    })
    .email("L'identifiant doit être une adresse email valide"),
});
export const useForgotPasswordForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });
  return formContext ?? form;
};
