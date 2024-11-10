import { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
    })
}

const adminAuth = getAuth()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { idToken } = req.body

    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken)
        
        // Verify user has admin role (owner or manager)
        if (!decodedToken.role || !['owner', 'manager'].includes(decodedToken.role)) {
            throw new Error('Not authorized as admin')
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
        const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        }

        res.setHeader(
            'Set-Cookie',
            `auth-token=${idToken}; ${Object.entries(options)
                .map(([key, value]) => `${key}=${value}`)
                .join('; ')}`
        )

        res.status(200).json({ 
            status: 'success',
            role: decodedToken.role 
        })
    } catch (error) {
        console.error('Session error:', error)
        res.status(401).json({ error: 'Not authorized' })
    }
}