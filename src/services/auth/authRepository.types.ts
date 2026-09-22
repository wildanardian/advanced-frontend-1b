export interface AuthUser {
  id: string;
  name: string;
}

export interface AuthRepository {
  register: (name: string, password: string, confirmPassword: string) => Promise<AuthUser>;
  login: (username: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthUser | null>;
}