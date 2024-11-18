'use client'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/auth/client";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});




export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // Pass the token to your server to create a session
    const response = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ idToken }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        window.location.href = "/admin/dashboard";
    } else {
      return {
        errors: { email: ["Failed to create session"], password: undefined },
      };
    }
  } catch (error : any) {
    return {
      errors: { email: [error.message], password: undefined },
    };
  }
}



