import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/auth/admin";
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

    //get full user doc to get user privileges.
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get()
    if(userDoc.exists){

        const userRole = userDoc.data()?.role;
        const userName = userDoc.data()?.fName;
        console.log(userRole)
        await createSession(decodedToken.uid, userRole, userName);

        return NextResponse.json({ message: "Session created" }, { status: 200 });
    }

    // Create session and set cookie
    
  } catch (error : any) {
    console.error("Session Creation Error:", error.message);
    return NextResponse.json({ error: "Invalid ID token or internal error" }, { status: 401 });
  }
}

