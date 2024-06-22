import { NextResponse, NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = [
  "/dashboard",
  // Add more routes as needed
];

// Middleware to check for session token
export async function middleware(req: NextRequest) {
  const sessionToken =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");

  // If session token does not exist and the path is protected, redirect to login page
  if (
    !sessionToken &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If user is logged in and tries to access the login page, redirect to the main page
  if (sessionToken && req.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Config to specify which routes the middleware should run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sw.js).*)",
  ],
};
