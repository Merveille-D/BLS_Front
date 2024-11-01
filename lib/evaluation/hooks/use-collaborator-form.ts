import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  firstname: z
    .string({
      required_error: "Le prénom est requis",
    })
    .min(1, "Le prénom est requis"),
  lastname: z
    .string({
      required_error: "Le nom est requis",
    })
    .min(1, "Le nom est requis"),
});
export const useCollaboratorForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });
  return formContext ?? form;
};
