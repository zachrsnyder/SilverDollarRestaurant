import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/auth/admin";
import { createSession, deleteSession } from "@/lib/auth/session";
import { cookies } from "next/headers";

// POST: Create a session
export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 });
    }

    // Verify the Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Create session and set cookie
    await createSession(decodedToken.uid);

    return NextResponse.json({ message: "Session created" }, { status: 200 });
  } catch (error : any) {
    console.error("Session Creation Error:", error.message);
    return NextResponse.json({ error: "Invalid ID token or internal error" }, { status: 401 });
  }
}