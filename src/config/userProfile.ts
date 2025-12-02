/**
 * User profile configuration
 */

export interface UserProfile {
  name: string;
  initials: string;
  email?: string;
}

/**
 * Current user profile
 */
export const currentUser: UserProfile = {
  name: "Aamir",
  initials: "AA",
  email: "aamir@example.com"
};

/**
 * Helper function to get user initials from a name
 * @param name - Full name
 * @returns Initials (up to 2 characters)
 */
export function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
