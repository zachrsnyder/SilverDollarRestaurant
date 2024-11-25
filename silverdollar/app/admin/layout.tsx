import { Metadata } from 'next'



export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <div>
        <div className="container min-h-screen">
            {children}
            {modal}
        </div>
    </div>
  )
}