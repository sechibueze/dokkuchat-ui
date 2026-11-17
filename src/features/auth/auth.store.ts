import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthUser } from '@/features/auth/auth.schema';
import {
  clearSessionCookie,
  writeSessionCookie,
} from '@/features/auth/auth.util';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  setSession: (accessToken: string) => void;
  setAuthUser: (user: AuthUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setSession: (accessToken: string) => {
        writeSessionCookie(accessToken);
        set({ accessToken });
      },
      setAuthUser: (user: AuthUser) => {
        set({ user });
      },
      clearSession: () => {
        clearSessionCookie();
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: 'dokkuchat-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ accessToken }) => ({ accessToken }),
    },
  ),
);
