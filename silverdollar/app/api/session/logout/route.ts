import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { auth } from "firebase-admin";


export async function POST(req: NextRequest){
    try{
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('authToken')?.value

        console.log("Delete it?")

        console.log(sessionCookie)
        
        if (sessionCookie) {
        // if the session is still rolling, revoke it
            
            const decodedClaims = await auth().verifySessionCookie(sessionCookie)
            await auth().revokeRefreshTokens(decodedClaims.sub)
        
            cookieStore.delete('authToken')
        }
        return NextResponse.json({success: true})
    }catch(error: any){
        console.log("Error logging out of session: ", error)
        return NextResponse.json({success: false, message: error})
    }
} 