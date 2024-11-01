import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  username: z
    .string({ required_error: "Le nom d'utilisateur est requis" })
    .min(1, "Le nom d'utilisateur est requis"),
  lastname: z
    .string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis"),
  firstname: z
    .string({ required_error: "Les prénoms sont requis" })
    .min(1, "Les prénoms sont requis"),
  email: z
    .string({
      required_error: "L'email est requis",
    })
    .email("Email invalide"),
  roleId: z.string({ required_error: "Le rôle est requis" }),
  subsidiaryId: z.string({ required_error: "La filiale est requise" }),
});
export const useUserForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: "",
      lastname: "",
      firstname: "",
      email: "",
      roleId: "",
      subsidiaryId: "",
    },
  });
  return formContext ?? form;
};
