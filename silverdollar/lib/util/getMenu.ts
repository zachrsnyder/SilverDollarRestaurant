'use server'

import { cache } from "react";
import { adminFileStorage, adminDb } from "../auth/admin";



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
            const version = doc.version

            const bucket = adminFileStorage.bucket();
            
            if(1){
                const [breakfastSignedUrl, dinnerSignedUrl] = await Promise.all([
                    bucket.file(`menus/v${version}/breakfast.pdf`).getSignedUrl({
                        action: 'read',
                        expires: Date.now() + 1000 * 60 * 60

                    }),
                    bucket.file(`menus/v${version}/dinner.pdf`).getSignedUrl({
                        action: 'read',
                        expires: Date.now() + 1000 * 60 * 60
                    }),
                ])

                return {
                    breakfast: breakfastSignedUrl[0],
                    dinner: dinnerSignedUrl[0]
                }
            }else{
                return { breakfast: '/', dinner: '/', error: 400, message: 'Missing one or more of the necessary Urls'}
            }
            
        }else{
            // indicating no menu ledger found
            return { breakfast: '/', dinner: '/', error: 400, message: 'Could not find record of menu data.'}
        }
    }catch( errer : any){
        return { breakfast: '/', dinner: '/', error: 400, message:'Error occurred while fetching menues'}
    }
}