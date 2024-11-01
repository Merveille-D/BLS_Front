"use server";
import countriesData from "./data/countries.json";
import citiesData from "./data/cities.json";
/**
 * Fetches all countries from the server.
 * @returns A promise that resolves to an array of countries.
 */
export const getAllCountries = async () =>
  countriesData
    .map((item) => {
      try {
        return {
          code: item.code,
          name: item.name,
          flag: item.flag,
        };
      } catch (e) {
        return null;
      }
    })
    .filter((country) => country !== null);
/**
 * Fetches all cities for a given country code.
 * @param countryCode The country code.
 * @returns A promise that resolves to an array of cities.
 */
export const getCitiesByCountry = async (countryCode) =>
  citiesData[countryCode] ?? [];
