import * as admin from 'firebase-admin';
// import { auth } from "firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST: Create a session
export async function POST(req: Request) {

  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          // Handle both formats of the private key
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
      });
      console.log("Firebase Admin initialized successfully");
    } catch (error) {
      console.error("Firebase Admin initialization error:", error);
      // Log the environment variable availability without exposing actual values
      console.log("Environment variables present:", {
        projectId: !!process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY
      });
    }
  }

  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 });
    }

    //console.log(idToken)

    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: 1000 * 60 * 60 * 24 * 5})

    const cookieStore = await cookies();
    cookieStore.set('authToken', sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 5 //5days
    });

    return NextResponse.json({ success: true })
  } catch (error : any) {
    console.error("Session Creation Error:", error.message);
    return NextResponse.json({ error: "Invalid ID token or internal error" }, { status: 401 });
  }
}