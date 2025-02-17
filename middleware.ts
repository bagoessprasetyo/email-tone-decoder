import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request as any // Type assertion to bypass type checking
  });
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isComposePage = request.nextUrl.pathname.startsWith("/compose");

  if (isComposePage && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/compose", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/compose/:path*", "/auth/:path*"],
};