import { FetchService } from "@/services/api-sdk/lib/utils";
import { getToken } from "@/services/auth/helpers";
import { redirect } from "next/navigation";
import { AuthRoutes } from "@/config/routes";
import { getDefaultLocaleServer } from "@/config/locales/utils/server";
/**
 * Fetch service instance
 * @type {FetchService}
 */
console.log('API URL:', process.env.API_URL);
export const fetchService = new FetchService({
  baseUrl: process.env.API_URL,
  requestInterceptor: async () => {



    const token = await getToken();
    const locale = await getDefaultLocaleServer();
    const headers = {
      cache: "no-store",
      "X-Locale": locale,
    };
    
    if (token?.accessToken) {
      headers["Authorization"] = `Bearer ${token.accessToken}`;
    }
    return {
      headers
    };
  },
  
  responseInterceptor: (response) => {
    if (response.status === 401) {
      redirect(AuthRoutes.logout);
    }
    return response;
  },
});
