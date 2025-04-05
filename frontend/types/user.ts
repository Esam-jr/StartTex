export enum UserRole {
  ADMIN = "ADMIN",
  ENTREPRENEUR = "ENTREPRENEUR",
  SPONSOR = "SPONSOR",
  MENTOR = "MENTOR",
  INVESTOR = "INVESTOR",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}

export type SafeUser = Omit<User, "id"> & {
  id: string;
}; 