import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST: Create a session
export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 });
    }


    const cookieStore = await cookies();
    cookieStore.set('authToken', idToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return NextResponse.json({ success: true })
  } catch (error : any) {
    console.error("Session Creation Error:", error.message);
    return NextResponse.json({ error: "Invalid ID token or internal error" }, { status: 401 });
  }
}

