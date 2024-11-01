import { useQuery } from "@tanstack/react-query";
import { getAllCountries, getCitiesByCountry } from "./requests";
/**
 * Tag for the query to fetch all countries.
 */
export const ALL_COUNTRIES_QUERY_TAG = ["COUNTRIES", "ALL_COUNTRIES"];
/**
 * Tag for the query to fetch cities by country.
 * @param countryCode The country code.
 * @returns The query tag.
 */
export const getCitiesByCountryQueryTag = (countryCode) =>
  ["CITIES", countryCode].filter(Boolean);
/**
 * Hook to fetch all countries.
 * @returns The query result.
 */
export const useAllCountries = () =>
  useQuery({
    queryKey: ALL_COUNTRIES_QUERY_TAG,
    queryFn: () => getAllCountries(),
  });
/**
 * Hook to fetch cities by country.
 * @param countryCode The country code.
 * @returns The query result.
 */
export const useCitiesByCountry = (countryCode) =>
  useQuery({
    queryKey: getCitiesByCountryQueryTag(countryCode),
    queryFn: () =>
      countryCode ? getCitiesByCountry(countryCode) : Promise.resolve([]),
  });
