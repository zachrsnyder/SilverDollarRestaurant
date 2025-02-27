"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { AuthService } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";

const emptyErrors = {
  email: undefined,
  password: undefined
}
export function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{
    email?: string[] | undefined;
    password?: string[] | undefined;
  }>(emptyErrors);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await AuthService.checkAccount(email, password)
      setError(res?.errors ? res.errors : emptyErrors)     
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === "email"){
      setEmail(value)
    }else if(name === "password"){
      setPassword(value)
    }
    // Clear error when user starts typing
    if (error) setError(emptyErrors);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Admin Portal</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              className="w-full rounded-md bg-gray-200 border  border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {error?.email && (
              <p className="text-sm text-red-500">{error?.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              className="w-full rounded-md bg-gray-200 border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {error?.password && (
              <p className="text-sm text-red-500">{error.password}</p>
            )}
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:bg-blue-400"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}