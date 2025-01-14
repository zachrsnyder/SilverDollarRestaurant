import { Metadata } from 'next'
import { AuthProvider } from './components/AuthProvider'



export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <div>
      <AuthProvider>
        <div className="container min-h-screen">
            {children}
            {modal}
        </div>
      </AuthProvider>
    </div>
  )
}