"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllContracts } from "@/services/api-sdk/models/contract/contract";
import { useAllLitigation } from "@/services/api-sdk/models/litigation/litigation";
import { useAllMortgages } from "@/services/api-sdk/models/mortgage";
import { useMemo } from "react";
import { useAllAccountIncidents } from "@/services/api-sdk/models/account-incident";
import { useAllRecoveries } from "@/services/api-sdk/models/recovery";
export function ModuleItemSelectComponent({
  module,
  moduleLabel,
  className,
  ...props
}) {
  const {
    data: contractsData,
    isLoading: isLoadingContracts,
    isError: isContractsError,
  } = useAllContracts();
  const {
    data: litigationData,
    isLoading: isLoadingLitigation,
    isError: isLitigationError,
  } = useAllLitigation();
  const {
    data: mortgagesData,
    isLoading: isLoadingMortgages,
    isError: isMortgagesError,
  } = useAllMortgages();
  const {
    data: incidentsData,
    isLoading: isLoadingIncidents,
    isError: isIncidentsError,
  } = useAllAccountIncidents();
  const {
    data: recoveriesData,
    isLoading: isLoadingRecoveries,
    isError: isRecoveriesError,
  } = useAllRecoveries();
  const isError = useMemo(() => {
    switch (module) {
      case "contracts":
        return isContractsError;
      case "litigation":
        return isLitigationError;
      case "conventionnal_hypothec":
        return isMortgagesError;
      case "incidents":
        return isIncidentsError;
      case "recovery":
        return isRecoveriesError;
      default:
        return false;
    }
  }, [
    module,
    isContractsError,
    isLitigationError,
    isMortgagesError,
    isIncidentsError,
    isRecoveriesError,
  ]);
  const isLoading = useMemo(() => {
    switch (module) {
      case "contracts":
        return isLoadingContracts;
      case "litigation":
        return isLoadingLitigation;
      case "conventionnal_hypothec":
        return isLoadingMortgages;
      case "incidents":
        return isLoadingIncidents;
      case "recovery":
        return isLoadingRecoveries;
      default:
        return false;
    }
  }, [
    module,
    isLoadingContracts,
    isLoadingLitigation,
    isLoadingMortgages,
    isLoadingIncidents,
    isLoadingRecoveries,
  ]);
  const data = useMemo(() => {
    switch (module) {
      case "contracts":
        return contractsData?.map((contract) => ({
          value: contract.id,
          label: contract.title,
        }));
      case "litigation":
        return litigationData?.map((litigation) => ({
          value: litigation.id,
          label: litigation.title,
        }));
      case "conventionnal_hypothec":
        return mortgagesData?.map((mortgage) => ({
          value: mortgage.id,
          label: mortgage.title,
        }));
      case "incidents":
        return incidentsData?.map((incident) => ({
          value: incident.id,
          label: incident.title,
        }));
      case "recovery":
        return recoveriesData?.map((recovery) => ({
          value: recovery.id,
          label: recovery.title,
        }));
      default:
        return [];
    }
  }, [
    module,
    contractsData,
    litigationData,
    mortgagesData,
    incidentsData,
    recoveriesData,
  ]);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={`Sélectionner un ${moduleLabel}`} />
      </SelectTrigger>
      <SelectContent>
        {isLoading && (
          <SelectItem
            disabled
            value="__loading__"
          >
            Chargement...
          </SelectItem>
        )}
        {!data ||
          (data.length === 0 && (
            <SelectItem
              disabled
              value="__empty__"
            >
              Aucun élément trouvé
            </SelectItem>
          ))}
        {data?.map((category) => (
          <SelectItem
            key={category.value}
            value={category.value}
          >
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
