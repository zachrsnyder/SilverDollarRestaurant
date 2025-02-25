import { Metadata } from 'next'
import { AuthProvider } from './components/AuthProvider'
import NavBarAdmin from '../maincomps/NavBarAdmin'



export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <div>
      <NavBarAdmin/>
      <AuthProvider>
        <div className="container min-h-screen">
            {children}
            {modal}
        </div>
      </AuthProvider>
    </div>
  )
}