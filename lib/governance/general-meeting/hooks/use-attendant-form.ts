import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  name: z
    .string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis"),
  grade: z
    .string({ required_error: "La qualité est requise" })
    .min(1, "La qualité est requise"),
});
export const useAttendantForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      grade: "",
    },
  });
  return formContext ?? form;
};
