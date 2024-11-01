import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  file: z.instanceof(File, {
    message: "Le fichier est requis",
  }),
});
const editModeValidationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  file: z.instanceof(File).optional(),
});
export const useTextItemForm = (editMode) => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(
      editMode ? editModeValidationSchema : validationSchema,
    ),
    defaultValues: {
      title: "",
    },
  });
  return formContext ?? form;
};
