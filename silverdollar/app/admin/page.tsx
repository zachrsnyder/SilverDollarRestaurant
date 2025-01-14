'use client'
import { AuthProvider } from "./components/AuthProvider";
import { LoginForm } from "./components/LoginForm";

const Login = () => {
  return (
    <AuthProvider>
    <div className='container flex justify-center min-h-screen'>
      <LoginForm />
    </div>
    </AuthProvider>
  )
}

export default Login