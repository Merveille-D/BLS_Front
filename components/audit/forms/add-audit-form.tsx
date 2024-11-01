"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useAddAuditForm } from "@/lib/audit/hooks";
import { useAllAuditCriteria } from "@/services/api-sdk/models/audit/criteria";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auditModules } from "@/services/api-sdk/types/audit";
import { Tag } from "lucide-react";
import ModuleItemSelect from "@/components/audit/inputs/module-item-select";
import { NumberInput } from "@/components/ui/number-input";
export default function AddAuditForm({ formId, className, onSubmit }) {
  const [moduleLabel, setModuleLabel] = useState("");
  const {
    form: { setValue, watch, ...form },
    scoresArray,
  } = useAddAuditForm();
  const { data, isLoading } = useAllAuditCriteria(
    watch("module")
      ? {
          module: watch("module"),
        }
      : undefined,
  );
  useEffect(() => {
    const { unsubscribe } = watch(({ module }) => {
      switch (module) {
        case "contracts":
          setModuleLabel("Contrat");
          break;
        case "litigation":
          setModuleLabel("Contentieux");
          break;
        case "conventionnal_hypothec":
          setModuleLabel("Hypothèque");
          break;
        case "incidents":
          setModuleLabel("Incident");
          break;
        case "recovery":
          setModuleLabel("Recouvrement");
          break;
        case "session_administrators":
          setModuleLabel("Conseil d'administration");
          break;
        case "management_committees":
          setModuleLabel("Direction Générale");
          break;
        case "general_meeting":
          setModuleLabel("Assemblée Générale");
          break;
        case "guarantees_security_personal":
          setModuleLabel("Sûreté personnelle");
          break;
        case "guarantees_security_movable":
          setModuleLabel("Sûreté mobilière");
          break;
        default:
          setModuleLabel("");
          break;
      }
    });
    return unsubscribe;
  }, [watch]);
  useEffect(() => {
    if (data) {
      setValue(
        "scores",
        data.map((criteria) => ({ criteriaId: criteria.id, score: 0 })),
      );
    }
  }, [data, setValue]);
  return (
    <Form
      {...form}
      watch={watch}
      setValue={setValue}
    >
      <form
        id={formId}
        className={cn("flex flex-col gap-5", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionner un module" />
                  </SelectTrigger>
                  <SelectContent>
                    {auditModules.map((module) => (
                      <SelectItem
                        key={module.value}
                        value={module.value}
                      >
                        {module.labels.singular}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watch("module") && (
          <FormField
            control={form.control}
            name="moduleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{moduleLabel}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <ModuleItemSelect
                      module={watch("module")}
                      moduleLabel={moduleLabel}
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
        )}

        {isLoading && (
          <p className="text-center text-muted-foreground">
            Chargement des critères d&apos;évaluation...
          </p>
        )}

        {!isLoading && scoresArray.fields.length === 0 && (
          <p className="text-center text-muted-foreground">
            Aucun critère d&apos;audit n&apos;est disponible pour ce module
          </p>
        )}

        {!isLoading && scoresArray.fields.length > 0 && (
          <div className="flex items-center gap-5">
            <span className="line-clamp-2 flex-1 text-lg italic text-muted-foreground">
              Critères d&apos;évaluation
            </span>
            <span className="w-20 text-lg italic text-muted-foreground">
              Notes
            </span>
          </div>
        )}

        {!isLoading &&
          scoresArray.fields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-5"
            >
              <span className="line-clamp-2 flex-1">
                {data?.find((c) => c.id === item.criteriaId)?.title}
              </span>

              <FormField
                control={form.control}
                name={`scores.${index}.score`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <div className="inline-flex items-center gap-1">
                      <FormControl>
                        <NumberInput
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <span>
                        /{data?.find((c) => c.id === item.criteriaId)?.maxScore}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
      </form>
    </Form>
  );
}
