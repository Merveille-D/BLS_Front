import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag } from "lucide-react";
import React from "react";
import { useProfileForm } from "@/lib/evaluation/hooks";
import CollaboratorProfileSelect from "@/components/evaluation/inputs/collaborator-profile-select";
export default function ProfileForm({ className }) {
  const form = useProfileForm();
  return (
    <Form {...form}>
      <form className={className}>
        <FormField
          control={form.control}
          name="profileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profil</FormLabel>
              <FormControl>
                <div className="relative">
                  <CollaboratorProfileSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
