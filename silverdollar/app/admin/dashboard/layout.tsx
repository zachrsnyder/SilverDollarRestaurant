
import { CurrentContext } from "./components/CurrentContext"
export default function Layout({
    children,
    modal
  }: {
    children: React.ReactNode
    modal?: React.ReactNode
  }) {
    return (
        <CurrentContext>
          {children}
          {modal}
        </CurrentContext>
    )
  }