import nextAuthMiddleware from "next-auth/middleware";
import { NextResponse } from "next/server";
import { AuthRoutes, ModulesRoutes } from "@/config/routes";
import { getToken } from "next-auth/jwt";
/**
 * Routes that require authentication
 */
const PROTECTED_ROUTES = ["/dashboard/(.*)", "/logout"];
/**
 * Routes that are only accessible if the user is not authenticated
 */
const UNPROTECTED_ROUTES = [AuthRoutes.login];
/**
 * Verify if the route is in a set of routes
 * @param routesSet - Set of routes
 * @param pathname - Pathname to verify
 * @returns - Boolean
 */
const verifyRoute = (routesSet, pathname) =>
  routesSet.some((route) => {
    const re = new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`);
    return re.test(pathname);
  });
export async function middleware(req, event) {
  // If the route is in the protected routes, check if the user is authenticated
  // If the user is not authenticated, redirect to the login page
  if (verifyRoute(PROTECTED_ROUTES, req.nextUrl.pathname)) {
    return nextAuthMiddleware(req, event);
  }
  // If the route is in the unprotected routes, check if the user is authenticated
  // If the user is authenticated, redirect to the modules page
  if (verifyRoute(UNPROTECTED_ROUTES, req.nextUrl.pathname)) {
    const token = await getToken({ req });
    if (token) {
      return NextResponse.redirect(
        new URL(ModulesRoutes.modules, req.nextUrl.origin),
      );
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}
