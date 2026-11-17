import { z } from 'zod';

export const userRoleSchema = z.enum(['user', 'admin']);
export const userTierSchema = z.enum(['free', 'pro', 'enterprise']);

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: userRoleSchema,
  tier: userTierSchema,
});

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: authUserSchema,
});

const emailField = z.email('Enter a valid email address');

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(32),
    email: emailField,
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must contain a number'),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({ email: emailField });

export type UserRole = z.infer<typeof userRoleSchema>;
export type UserTier = z.infer<typeof userTierSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
