"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/Input";
import { authApi } from "@/features/auth/auth.api";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { FormError } from "@/features/auth/components/FormError";
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton";
import { loginSchema } from "@/features/auth/auth.schema";
import { useAuthStore } from "@/features/auth/auth.store";
import { useForm } from "@/hooks/useForm";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const { getFieldProps, handleSubmit, isSubmitting, serverError } = useForm({
    initialValues: { email: "", password: "" },
    schema: loginSchema,
    onSubmit: async (credentials) => {
      const apiResult = await authApi.login(credentials);

      setSession(apiResult.data.accessToken);
      router.push(redirectTo);
    },
  });

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to continue to your documents."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormError message={serverError} />
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          {...getFieldProps("email")}
        />
        <InputField
          label="Password"
          type="password"
          autoComplete="current-password"
          {...getFieldProps("password")}
        />
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Log in
        </Button>
      </form>
      <GoogleSignInButton />
    </AuthCard>
  );
}
