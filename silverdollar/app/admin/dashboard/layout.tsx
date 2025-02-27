
import { CurrentContext } from "./components/CurrentContext"
export default function Layout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
        <CurrentContext>
          {children}
        </CurrentContext>
    )
  }