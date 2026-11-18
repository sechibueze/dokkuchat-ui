import { api } from '@/lib/api-client';
import { env } from '@/lib/env';
import {
  authResponseSchema,
  type ForgotPasswordInput,
  type LoginInput,
  type SignupInput,
  type AuthResponse,
  UserTier,
  UserRole,
} from '@/features/auth/auth.schema';

type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type AuthApiResponse<T> = ApiResponse<T> & {
  data: T;
};
export const authApi = {
  login: (input: LoginInput) =>
    api.post<
      AuthApiResponse<{
        accessToken: string;
        user: { id: string; name: string };
      }>
    >('/auth', input),
  getCurrentUser: () =>
    api.get<
      AuthApiResponse<{
        id: string;
        name: string;
        email: string;
        role: UserRole;
        tier: UserTier;
        status: string;
      }>
    >('/auth/me'),
  signup: ({ name, email, password }: SignupInput) =>
    api.post('/auth/signup', { name, email, password }),
  forgotPassword: (input: ForgotPasswordInput) =>
    api.post<void>('/auth/forgot-password', input),
  googleLoginUrl: `${env.NEXT_PUBLIC_API_URL}/auth/google`,
};
