// import { getSessionUser } from "@/lib/auth/session";
// import { NextResponse } from "next/server";

// export async function GET(req : Request){
//     try {
//         const user = await getSessionUser()
//         console.log(user);
//         return NextResponse.json({body: user}, {status: 200});
//       } catch (error : any) {
//         console.error("Session Creation Error:", error.message);
//         return NextResponse.json({ error: "Invalid ID token or internal error" }, { status: 401 });
//       }
// }