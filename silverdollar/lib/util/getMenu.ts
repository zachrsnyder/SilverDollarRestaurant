'use server'

import { cache } from "react";
import * as admin from 'firebase-admin'



export const getMenu = cache(async () => {
  const menues = await getData();
  return menues;
});

export async function getData() {
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
        const menuSnapshot = await admin.firestore()
            .collection('menu')
            .limit(1)
            .get();
        if(!menuSnapshot.empty){
            const doc = menuSnapshot.docs[0].data();
            console.log(doc)
            const version = doc.version

            
            return {
                breakfast: doc?.breakfastUrl,
                dinner: doc?.dinnerUrl
            }
        }else{
            // indicating no menu ledger found
            return { breakfast: '/', dinner: '/', error: 400, message: 'Could not find record of menu data.'}
        }
    }catch( errer : any){
        return { breakfast: '/', dinner: '/', error: 400, message:'Error occurred while fetching menues'}
    }
}