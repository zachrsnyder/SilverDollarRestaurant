
// role based access control state manager!

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './client';
import { AuthService } from './auth';
import { AdminUser } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [role, setRole] = useState(null);
  const [loadingSession, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = await AuthService.getUserInfo(user.uid);
        const updatedUser = {
            userId: user.uid,
            fName: userInfo?.fName,
            lName: userInfo?.lName,
            email: userInfo?.email,
            role: userInfo?.role
        } as AdminUser

      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, setUser, loadingSession };
}