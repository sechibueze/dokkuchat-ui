import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthUser } from '@/features/auth/auth.schema';
import {
  clearSessionCookie,
  writeSessionCookie,
} from '@/features/auth/auth.util';
import { authApi } from './auth.api';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  setSession: (accessToken: string) => void;
  setAuthUser: (user: AuthUser) => void;
  clearSession: () => void;
  isInitializing: boolean;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isInitializing: true,
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
      initializeAuth: async () => {
        try {
          const res = await authApi.getCurrentUser();

          console.log('Auth initialized with user:', res.data);
          set({ user: res.data, isInitializing: false });
        } catch {
          set({
            user: null,
            accessToken: null,
            isInitializing: false,
          });
        }
      },
    }),
    {
      name: 'dokkuchat-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ accessToken }) => ({ accessToken }),
    },
  ),
);
