'use server'

import { cache } from "react";
import { adminDb } from "../auth/admin";



export const getMenu = cache(async () => {
  const menues = await getData();
  return menues;
});

export async function getData() {
    try {
        const menuSnapshot = await adminDb
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