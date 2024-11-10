'use client'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  ownerOnly?: boolean;
  children: React.ReactNode;
}

export function RoleBasedAccess({ ownerOnly = false, children }: Props) {
  const { user } = useAuth();
  
  if (!user || (ownerOnly && user.role !== 'owner')) {
    return null;
  }

  return <>{children}</>;
}