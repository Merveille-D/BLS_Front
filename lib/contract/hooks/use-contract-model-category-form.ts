import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  name: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
});
export const useContractModelCategoryForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
    },
  });
  return formContext ?? form;
};
