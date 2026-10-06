import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, Role } from './types';
import { currentUser } from './data';

type AuthContextType = {
  user: User | null;
  login: (email: string, roles?: Role[]) => void;
  logout: () => void;
  register: (name: string, email: string, roles: Role[]) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, roles?: Role[]) => {
    if (roles && roles.length > 0) {
      setUser({ ...currentUser, email, roles });
    } else {
      setUser(currentUser);
    }
  };

  const register = (name: string, email: string, roles: Role[]) => {
    setUser({ ...currentUser, name, email, roles });
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
