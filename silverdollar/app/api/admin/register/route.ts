// api/auth/register.ts
import { auth } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    
    const { email, password, role, fName, lName } = await req.json()
    
    // Create user with Admin SDK
    const newUser = await auth().createUser({
      email,
      password
    })

    // Set their claims
    await auth().setCustomUserClaims(newUser.uid, {
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