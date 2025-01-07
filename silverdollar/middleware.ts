import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/session";
import { verify } from "jsonwebtoken"; // Add this import

const protectedRoutes = ["/admin/dashboard"];
const protectedApiRoutes = ["/api/admin"]; // Add API routes that need protection


//todo: Dont decrypt cookie if the route isnt a protected one cmon now


export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = await cookies();
  const value = cookie.get("session")?.value;
  const session = await decrypt(value);

  // Protected page routes
  if (protectedRoutes.includes(path) && !session?.userId) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  
  // Protected API routes
  if (path.startsWith("/api/admin")) {
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      // Verify admin role
      if (!session.role || !(session.role == "owner" || session.role == "manager")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } catch (error) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }
  }

  // Checking to ensure randoms can't create job postings. Essentially G checking you! Had to leave this route outside of admin because everyone has the right to load the jobs.
  if(path.startsWith("api/jobPosting")){
    if(req.method == "POST" && !session?.userId){
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, "/api/admin/:path*"]
};