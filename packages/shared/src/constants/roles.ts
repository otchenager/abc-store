export const USER_ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER"
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
