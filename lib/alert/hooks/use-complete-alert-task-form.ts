import { useFieldArray, useForm, useFormContext } from "react-hook-form";
export const useCompleteAlertTaskForm = (fields) => {
  const formContext = useFormContext();
  const newForm = useForm({
    defaultValues: fields.reduce((acc, item) => {
      if (item.type === "radio") {
        return { ...acc, [item.name]: false };
      }
      if (item.type === "select") {
        return { ...acc, [item.name]: "" };
      }
      if (item.type === "text") {
        return { ...acc, [item.name]: "" };
      }
      if (item.type === "date") {
        return { ...acc, [item.name]: new Date() };
      }
      return { ...acc, [item.name]: null };
    }, {}),
  });
  const form = formContext ?? newForm;
  const filesArray = useFieldArray({
    control: form.control,
    name: fields.find((item) => item.type === "files")?.name ?? "documents",
  });
  return { form, filesArray };
};
