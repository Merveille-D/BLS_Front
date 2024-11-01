"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all contracts from the server.
 * @param queries - The queries to filter the contracts.
 * @returns A promise that resolves to an array of contracts.
 * @throws {ApiError} if the request fails.
 */
export const getAllContracts = async (queries) => {
  const queriesString = new URLSearchParams(queries).toString();
  const response = await fetchService.get(
    `/contracts${queriesString ? `?${queriesString}` : ""}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            category: {
              id: item.category.id,
              label: item.category.value,
            },
            categoryType: item.type_category && {
              id: item.type_category.id,
              label: item.type_category.value,
            },
            categorySubType: item.sub_type_category && {
              id: item.sub_type_category.id,
              label: item.sub_type_category.value,
            },
            createdBy: item.created_by,
            signatureDate: item.date_signature
              ? new Date(item.date_signature)
              : undefined,
            effectiveDate: item.date_effective
              ? new Date(item.date_effective)
              : undefined,
            expirationDate: item.date_expiration
              ? new Date(item.date_expiration)
              : undefined,
            renewalDate: item.date_renewal
              ? new Date(item.date_renewal)
              : undefined,
            firstStakeholdersGroup: item.first_part.map((part) => ({
              stakeholderId: part.part_id,
              description: part.description,
            })),
            secondStakeholdersGroup: item.second_part.map((part) => ({
              stakeholderId: part.part_id,
              description: part.description,
            })),
          };
        } catch (e) {
          return null;
        }
      })
      .filter((contract) => contract !== null);
  }
  throw new ApiError("Failed to fetch all contracts");
};
/**
 * Fetches one contract from the server.
 * @param contractId - The id of the contract.
 * @returns A promise that resolves to the contract.
 * @throws {ApiError} if the request fails.
 */
export const getOneContract = async (contractId) => {
  const response = await fetchService.get(`/contracts/${contractId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      category: {
        id: item.category.id,
        label: item.category.value,
      },
      categoryType: item.type_category && {
        id: item.type_category.id,
        label: item.type_category.value,
      },
      categorySubType: item.sub_type_category && {
        id: item.sub_type_category.id,
        label: item.sub_type_category.value,
      },
      createdBy: item.created_by,
      filesGroups:
        item.documents?.map((document) => ({
          stepName: document.step_name,
          files: document.files.map((file) => ({
            filename: file.filename,
            fileUrl: file.file_url,
          })),
        })) ?? [],
      signatureDate: item.date_signature
        ? new Date(item.date_signature)
        : undefined,
      effectiveDate: item.date_effective
        ? new Date(item.date_effective)
        : undefined,
      expirationDate: item.date_expiration
        ? new Date(item.date_expiration)
        : undefined,
      renewalDate: item.date_renewal ? new Date(item.date_renewal) : undefined,
      firstStakeholdersGroup: item.first_part.map((part) => ({
        stakeholderId: part.part_id,
        description: part.description,
      })),
      secondStakeholdersGroup: item.second_part.map((part) => ({
        stakeholderId: part.part_id,
        description: part.description,
      })),
      forwards: item.transfers?.map((transfer) => ({
        id: transfer.id,
        title: transfer.title,
        dueDate: new Date(transfer.deadline),
        description: transfer.description,
        completed: transfer.status,
        sender: {
          id: transfer.sender.id,
          firstname: transfer.sender.firstname,
          lastname: transfer.sender.lastname,
          email: transfer.sender.email,
        },
        receiver: {
          id: transfer.collaborators[0].id,
          firstname: transfer.collaborators[0].firstname,
          lastname: transfer.collaborators[0].lastname,
          email: transfer.collaborators[0].email,
        },
      })),
    };
  }
  throw new ApiError("Failed to fetch this contract");
};
/**
 * Creates a contract.
 * @param args - The form data to create the contract.
 * @returns The created contract.
 * @throws {ApiError} if the request fails.
 */
export const createContract = async (args) => {
  const formData = args.filesData;
  formData.append("title", args.title);
  formData.append("contract_category_id", args.category);
  if (args.categoryType) {
    formData.append("contract_type_category_id", args.categoryType);
  }
  if (args.categorySubType) {
    formData.append("contract_sub_type_category_id", args.categorySubType);
  }
  args.firstStakeholdersGroup.forEach((part, index) => {
    formData.append(`first_part[${index}][part_id]`, part.stakeholderId);
    formData.append(`first_part[${index}][description]`, part.description);
  });
  args.secondStakeholdersGroup.forEach((part, index) => {
    formData.append(`second_part[${index}][part_id]`, part.stakeholderId);
    formData.append(`second_part[${index}][description]`, part.description);
  });
  const response = await fetchService.post("/contracts", formData);
  if (!response.ok) {
    throw new ApiError("Failed to create the contract");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    category: {
      id: item.category.id,
      label: item.category.value,
    },
    categoryType: item.type_category && {
      id: item.type_category.id,
      label: item.type_category.value,
    },
    categorySubType: item.sub_type_category && {
      id: item.sub_type_category.id,
      label: item.sub_type_category.value,
    },
    createdBy: item.created_by,
    signatureDate: item.date_signature
      ? new Date(item.date_signature)
      : undefined,
    effectiveDate: item.date_effective
      ? new Date(item.date_effective)
      : undefined,
    expirationDate: item.date_expiration
      ? new Date(item.date_expiration)
      : undefined,
    renewalDate: item.date_renewal ? new Date(item.date_renewal) : undefined,
    firstStakeholdersGroup: item.first_part.map((part) => ({
      stakeholderId: part.part_id,
      description: part.description,
    })),
    secondStakeholdersGroup: item.second_part.map((part) => ({
      stakeholderId: part.part_id,
      description: part.description,
    })),
  };
};
/**
 * Updates a contract.
 * @param contractId - The id of the contract.
 * @param args - The form data to update the contract.
 * @returns The updated contract.
 * @throws {ApiError} if the request fails.
 */
export const updateContract = async (contractId, args) => {
  const response = await fetchService.put(
    `/contracts/${contractId}`,
    JSON.stringify({
      title: args.title,
      contract_category_id: args.category,
      contract_type_category_id: args.categoryType,
      contract_sub_type_category_id: args.categorySubType,
      first_part: args.firstStakeholdersGroup?.map((part) => ({
        part_id: part.stakeholderId,
        description: part.description,
      })),
      second_part: args.secondStakeholdersGroup?.map((part) => ({
        part_id: part.stakeholderId,
        description: part.description,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the contract");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    category: {
      id: item.category.id,
      label: item.category.value,
    },
    categoryType: item.type_category && {
      id: item.type_category.id,
      label: item.type_category.value,
    },
    categorySubType: item.sub_type_category && {
      id: item.sub_type_category.id,
      label: item.sub_type_category.value,
    },
    createdBy: item.created_by,
    signatureDate: item.date_signature
      ? new Date(item.date_signature)
      : undefined,
    effectiveDate: item.date_effective
      ? new Date(item.date_effective)
      : undefined,
    expirationDate: item.date_expiration
      ? new Date(item.date_expiration)
      : undefined,
    renewalDate: item.date_renewal ? new Date(item.date_renewal) : undefined,
    firstStakeholdersGroup: item.first_part.map((part) => ({
      stakeholderId: part.part_id,
      description: part.description,
    })),
    secondStakeholdersGroup: item.second_part.map((part) => ({
      stakeholderId: part.part_id,
      description: part.description,
    })),
  };
};
/**
 * Forwards a contract.
 * @param contractId - The id of the contract.
 * @param args - The form data to forward the contract.
 * @returns The forwarded contract.
 * @throws {ApiError} if the request fails.
 */
export const forwardContract = async (contractId, args) => {
  const response = await fetchService.put(
    `/contracts/${contractId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the contract");
  }
};
/**
 * Plans the contract dates.
 * @param contractId - The id of the contract.
 * @param args - The form data to plan the contract dates.
 * @throws {ApiError} if the request fails.
 */
export const planContractDates = async (contractId, args) => {
  const response = await fetchService.put(
    `/contracts/${contractId}`,
    JSON.stringify({
      date_signature: args.signatureDate && formatDate(args.signatureDate),
      date_effective: args.effectiveDate && formatDate(args.effectiveDate),
      date_expiration: args.expirationDate && formatDate(args.expirationDate),
      date_renewal: args.renewalDate && formatDate(args.renewalDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to plan the contract dates");
  }
};
/**
 * Complete a contract.
 * @param contractId - The id of the contract.
 * @param args - The form data to complete the contract.
 * @returns The completed contract.
 * @throws {ApiError} if the request fails.
 */
export const completeContract = async (contractId, args) => {
  const formData = args.filesData;
  formData.append("type", "contract");
  formData.append("transfer_id", args.transferId);
  const response = await fetchService.post("/complete_transfers", formData);
  if (!response.ok) {
    throw new ApiError("Failed to complete the contract");
  }
};
/**
 * Deletes a contract.
 * @param contractId - The id of the contract.
 * @throws {ApiError} if the request fails.
 */
export const deleteContract = async (contractId) => {
  const response = await fetchService.delete(`/contracts/${contractId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the contract");
  }
};
/**
 * Prints a contract.
 * @param contractId - The id of the contract.
 * @throws {ApiError} if the request fails.
 */
export const printContract = async (contractId) => {
  const response = await fetchService.get(
    `/generate_pdf_fiche_suivi_contract?contract_id=${contractId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the contract");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "contract.pdf";
  return {
    buffer,
    filename,
  };
};
