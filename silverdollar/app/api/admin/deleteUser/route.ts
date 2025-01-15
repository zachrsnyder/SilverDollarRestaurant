import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){
    try{
        const {uid} = await req.json();

        console.log(uid);

        await auth().deleteUser(uid);

        return NextResponse.json({ success: true})
    }catch(error : any){
        console.error("Error deleting the auth user: ", error)
        return NextResponse.json({success: false, message: error.message})
    }
}