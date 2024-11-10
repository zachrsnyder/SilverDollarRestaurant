

export type UserRole = 'owner' | 'manager';

/**
 * @typedef {Object} AdminUser
 * @property {string} email - Admin's email
 * @property {UserRole} role - Either an owner or a manager
 * @property {string} name - Admin name
 */

export interface AdminUser {
  email: string;
  role: UserRole;
  name: string;
}
