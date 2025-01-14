// api/auth/register.ts
import { auth } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { uid, role, fName, lName } = await req.json()
    
    // user shoulda been created on the client already


    // Set their custom claims
    await auth().setCustomUserClaims(uid, {
      role: role,    
      fName : fName,
      lName : lName,
      createdAt: Date.now()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 400 })
  }
}