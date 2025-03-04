import { NextResponse } from "next/server";
import * as admin from "firebase-admin"


export async function GET(req: Request){
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
        const snapshot = await admin.firestore()
            .collection('jobPostings')
            .orderBy('createdAt', 'desc')
            .get();

    const initialPostings = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
        id: doc.id,
        title: data?.title,
        status: data?.status
    }});

    // Cache-control allows caching of postings for five minutes (300 seconds) and revalidation. Public value allows storage in CDN and browser cache.
    return NextResponse.json(initialPostings, {
        headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
          },
    })
    }catch(err: any){
        console.log("Error fetching job postings.");
        console.log(err);
        return NextResponse.json(
            { error: 'Failed to fetch job postings' },
      { 
        status: 500,
        headers: {
          // Don't cache errors
          'Cache-Control': 'no-store'
        }
      }
    )
    }
}