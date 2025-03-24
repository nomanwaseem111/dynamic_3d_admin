import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const refreshing = request.cookies.get("refreshing")?.value;

  console.log("tokenssss", token, refreshing);

  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  if (
    (pathname === "/products" || pathname === "/add-product") &&
    !token &&
    !refreshing
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/products", "/add-product"],
};
