import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  users: z.array(
    z.object({
      id: z.string({
        required_error: "Le collaborateur est requis",
      }),
    }),
  ),
  lawyers: z.array(
    z.object({
      id: z.string({
        required_error: "L'avocat est requis",
      }),
    }),
  ),
});
export const useAssignCollaboratorsForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      users: [],
      lawyers: [],
    },
  });
  const form = formContext ?? newForm;
  const usersArray = useFieldArray({
    control: form.control,
    name: "users",
  });
  const lawyersArray = useFieldArray({
    control: form.control,
    name: "lawyers",
  });
  return { form, usersArray, lawyersArray };
};
