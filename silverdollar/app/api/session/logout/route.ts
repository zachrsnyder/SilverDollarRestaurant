import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import * as admin from 'firebase-admin';


export async function POST(req: NextRequest){
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
    
    try{
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('authToken')?.value

        console.log("Delete it?")

        console.log(sessionCookie)
        
        if (sessionCookie) {
        // if the session is still rolling, revoke it
            
            const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie)
            await admin.auth().revokeRefreshTokens(decodedClaims.sub)
        
            cookieStore.delete('authToken')
        }
        return NextResponse.json({success: true})
    }catch(error: any){
        console.log("Error logging out of session: ", error)
        return NextResponse.json({success: false, message: error})
    }
} 