import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  name: z
    .string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis"),
  logo: z.instanceof(File).optional(),
  headOffice: z
    .string({ required_error: "Le siège social est requis" })
    .min(1, "Le siège social est requis"),
});
export const useBankInfosForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      headOffice: "",
    },
  });
  return formContext ?? form;
};
