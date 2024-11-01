import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  files: z.array(
    z.object({
      file: z.instanceof(File, {
        message: "Le fichier est requis",
      }),
      filename: z.string({
        required_error: "Le nom du fichier est requis",
      }),
    }),
  ),
});
export const useCompleteContractForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      files: [{}],
    },
  });
  const form = formContext ?? newForm;
  const filesArray = useFieldArray({
    control: form.control,
    name: "files",
  });
  return { form, filesArray };
};
