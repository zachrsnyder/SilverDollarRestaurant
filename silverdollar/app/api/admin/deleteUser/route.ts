import * as admin from 'firebase-admin'
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){
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
        const {uid} = await req.json();

        console.log(uid);

        await admin.auth().deleteUser(uid);

        return NextResponse.json({ success: true})
    }catch(error : any){
        console.error("Error deleting the auth user: ", error)
        return NextResponse.json({success: false, message: error.message})
    }
}