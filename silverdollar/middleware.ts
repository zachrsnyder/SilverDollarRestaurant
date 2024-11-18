import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/session";

const protectedRoutes = ["/admin/dashboard"];

export default async function middleware(req: NextRequest) {
  //nextUrl attribute available on the client and middleware and refers to the url the request is calling to.
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = await cookies()
  const value = cookie.get("session")?.value;
  // console.log(value);

  const session = await decrypt(value);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}