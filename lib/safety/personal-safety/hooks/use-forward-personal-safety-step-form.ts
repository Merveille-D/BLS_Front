import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  dueDate: z.date({
    required_error: "La date est requise",
  }),
  receiverId: z
    .string({
      required_error: "Le destinataire est requis",
    })
    .min(1, "Le destinataire est requis"),
  description: z
    .string({
      required_error: "La description est requise",
    })
    .min(1, "La description est requise"),
});
export const useForwardPersonalSafetyStepForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      dueDate: new Date(),
      receiverId: "",
      description: "",
    },
  });
  return formContext ?? form;
};
