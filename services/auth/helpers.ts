import "server-only";
import { getToken as getNextAuthToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
export const getToken = () => {
  const req = {
    headers: headers(),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  // @ts-expect-error: `req` is not a real request object
  return getNextAuthToken({ req });
};
