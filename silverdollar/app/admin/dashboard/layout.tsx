
export default function Layout({
    children,
    modal
  }: {
    children: React.ReactNode
    modal?: React.ReactNode
  }) {
    return (
      <div>
          <div className="min-h-screen flex items-center justify-center">
              {children}
              {modal}
          </div>
      </div>
    )
  }