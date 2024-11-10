import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/firebase.config'
import { useRouter } from 'next/navigation'

interface UserWithRole extends User {
  role?: 'owner' | 'manager';
}

export function useAuth() {
    const [user, setUser] = useState<UserWithRole | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Get the ID token with claims
                const token = await firebaseUser.getIdTokenResult()
                // Create a user object with role
                const userWithRole = {
                    ...firebaseUser,
                    role: token.claims.role as 'owner' | 'manager'
                }
                setUser(userWithRole)
            } else {
                setUser(null)
                router.push('/admin/login')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    return { user, loading }
}