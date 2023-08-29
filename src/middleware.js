import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/veriffytoken";

  const token = request.cookies.get("token")?.value || "";
  //   console.log(isPublicPath, path, token, request.nextUrl);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/profile",
    "/profile/:path*",
    "/veriffytoken",
  ],
};
