// src/constants/role.ts

// 사용자 상태
export const UserStatus = {
  PROVIDER: 'PROVIDER',
  MEMBER: 'MEMBER',
  APPLICANT: 'APPLICANT',
  APPLICANT_REJECTED: 'APPLICANT_REJECTED',
  NONE: 'NONE',
} as const;

export type UserStatus = keyof typeof UserStatus;

// 사용자 역할
export const Role = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type Role = keyof typeof Role;
