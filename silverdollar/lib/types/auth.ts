import { Timestamp } from "firebase/firestore";
import { ID } from "./ID";


/**
 * Different roles for admin users
 *
 * @export
 * @typedef {UserRole}
 */
export type UserRole = 'owner' | 'manager';

/**
 * Fields stored from session user in admin page
 *
 * @export
 * @interface AdminUser
 * @typedef {AdminUser}
 */
export interface AdminUser {
  userId?: ID;

  role?: UserRole;
  
  fName?: string;

  lName?: string;

  email?: string;

  createdAt?: Timestamp;
}


import { z, ZodString } from "zod";

export const formSchema = z.object({
    fName: z.string().trim(),
    lName: z.string().trim(),
    email: z.string()
      .email('Invalid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  //allows to check each individual value separately using shape
  export const fieldSchemas = {
    fName: z.string(),
    lName: z.string(),
    email: z.string().email('Invalid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
  };
  
  export type WorkerData = z.infer<typeof formSchema>;
  
