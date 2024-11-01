import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  filename: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  file: z.instanceof(File, {
    message: "Le fichier est requis",
  }),
});
export const useContractModelForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      filename: "",
    },
  });
  return formContext ?? form;
};
