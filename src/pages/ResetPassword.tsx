
import { AuthCard } from "@/components/auth/AuthCard";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <AuthCard
      title="Redefinir senha"
      description="Crie uma nova senha para sua conta"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
