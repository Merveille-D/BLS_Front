import { useQuery } from "@tanstack/react-query";
import {
  getAllContractCategories,
  getAllContractCategorySubTypes,
  getAllContractCategoryTypes,
} from "./requests";
/**
 * Tag for the query to fetch all contract categories.
 */
export const ALL_CONTRACT_CATEGORIES_QUERY_TAG = [
  "CONTRACT_CATEGORIES",
  "ALL_CATEGORIES",
];
/**
 * Tag for the query to fetch all contract category types.
 * @param category - The category of the contract.
 * @returns The query tag.
 */
export const getAllContractCategoryTypesQueryTag = (category) => [
  "CONTRACT_CATEGORIES",
  "ALL_TYPES",
  category,
];
/**
 * Tag for the query to fetch all contract category subtypes.
 * @param categoryType - The category type of the contract.
 * @returns The query tag.
 */
export const getAllContractCategorySubTypesQueryTag = (categoryType) => [
  "CONTRACT_CATEGORIES",
  "ALL_SUBTYPES",
  categoryType,
];
/**
 * Hook to fetch all contract categories.
 * @returns The query result.
 */
export const useAllContractCategories = () =>
  useQuery({
    queryKey: ALL_CONTRACT_CATEGORIES_QUERY_TAG,
    queryFn: () => getAllContractCategories(),
  });
/**
 * Hook to fetch all contract category types.
 * @param category - The category of the contract.
 * @returns The query result.
 */
export const useAllContractCategoryTypes = (category) =>
  useQuery({
    queryKey: getAllContractCategoryTypesQueryTag(category),
    queryFn: () => getAllContractCategoryTypes(category),
  });
/**
 * Hook to fetch all contract category subtypes.
 * @param categoryType - The category type of the contract.
 * @returns The query result.
 */
export const useAllContractCategorySubTypes = (categoryType) =>
  useQuery({
    queryKey: getAllContractCategorySubTypesQueryTag(categoryType),
    queryFn: () =>
      categoryType
        ? getAllContractCategorySubTypes(categoryType)
        : Promise.resolve([]),
  });
