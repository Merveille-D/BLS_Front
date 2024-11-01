import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({ required_error: "Le titre est requis" })
    .min(1, "Le titre est requis"),
  permissionIds: z
    .array(z.string({ required_error: "Les permissions sont requises" }))
    .min(1, "Les permissions sont requises"),
});
export const useRoleForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      permissionIds: [],
    },
  });
  return formContext ?? form;
};
