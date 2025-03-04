// api/auth/register.ts
import * as admin from "firebase-admin"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
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
    
    const { email, password, role, fName, lName } = await req.json()
    
    // Create user with Admin SDK
    const newUser = await admin.auth().createUser({
      email,
      password
    })

    // Set their claims
    await admin.auth().setCustomUserClaims(newUser.uid, {
      role,
      fName,
      lName,
      createdAt: Date.now()
    })

    return NextResponse.json({ success: true, uid: newUser.uid })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 400 })
  }
}