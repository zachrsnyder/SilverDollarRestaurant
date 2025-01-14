import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin/dashboard"];
const protectedApiRoutes = ["/api/admin", "/api/jobPostings"]; 

export default async function middleware(req: NextRequest) {
  console.log("running middleware")
  const path = req.nextUrl.pathname;
  
  if(path.includes('admin') && !path.includes("session")){
    const cookie = await cookies();
    const value = cookie.get("authToken")?.value;
    console.log(value)
    // if the session doesnt have a userId they cant enter the page
    if (!value) {
      if (protectedRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      }
    }

    // handle protected api routes
    if (protectedApiRoutes.includes(path)) {
      if (!value) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // If we get here, either:
    // 1. The user has a valid session, or
    // 2. They're trying to access /admin (login page)
    return NextResponse.next();
  }

  // For non-admin routes, just continue
  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...protectedApiRoutes]
};