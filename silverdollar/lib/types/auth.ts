

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
  userId?: string;

  role?: UserRole;
  
  fName?: string;


  expiresAt?: number;
  

  iat?: number;

  exp?: number;
}
