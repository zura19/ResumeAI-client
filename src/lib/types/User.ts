export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

type Role = "user" | "admin";
