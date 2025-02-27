'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/auth/client';

interface AuthContextType {
    user: User | null;
    loading: boolean;

    claims: any
  }

const AuthContext = createContext<AuthContextType>({
    user:null,
    loading:true,
    claims:null
});


interface AuthProps {
    children: ReactNode
}
export function AuthProvider({ children } : AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<any | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        const tokenResult = await user.getIdTokenResult()
        setClaims(tokenResult.claims)
      } else {
        setUser(null)
        setClaims(null)
      }
      setLoading(false)
    })

    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    claims
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);