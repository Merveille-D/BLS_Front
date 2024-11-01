import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
export const useContractDatesForm = (fieldName, defaultValue) => {
  const validationSchema = z.object({
    [fieldName]: z.date({
      required_error: "La date est requise",
    }),
  });
  const formContext = useFormContext();
  const form = useForm({
    defaultValues: {
      [fieldName]: defaultValue ?? new Date(),
    },
  });
  return formContext ?? form;
};
