"use client";
import { Form } from "@/components/ui/form";
import { useAssignCollaboratorsForm } from "@/lib/litigation/hooks";
import { cn } from "@/lib/utils";
import UsersSectionForm from "@/components/litigation/forms/users-section-form";
import LawyersSectionForm from "@/components/litigation/forms/lawyers-section-form";
import { useAssignCollaborators } from "@/services/api-sdk/models/litigation/litigation";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
export default function AssignCollaboratorsForm({
  formId,
  litigationId,
  className,
  onSuccess,
  onError,
}) {
  const { form, usersArray, lawyersArray } = useAssignCollaboratorsForm();
  const { mutateAsync } = useAssignCollaborators(litigationId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(
        {
          users: data.users.map(({ id }) => id),
          lawyers: data.lawyers.map(({ id }) => id),
        },
        {
          onSuccess: () => {
            toast({
              description: "Les collaborateurs ont été assignés avec succès.",
              className: "bg-primary text-primary-foreground",
            });
            onSuccess?.();
          },
          onError: () => {
            toast({
              description: "Une erreur est survenue lors de l'assignation.",
              className: "bg-destructive text-destructive-foreground",
            });
            onError?.();
          },
        },
      );
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-x-5 gap-y-10", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <UsersSectionForm
          label="Collaborateurs"
          fieldName="users"
          form={form}
          fieldArray={usersArray}
        />

        <LawyersSectionForm
          label="Avocats"
          fieldName="lawyers"
          form={form}
          fieldArray={lawyersArray}
        />
      </form>
    </Form>
  );
}
