
import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AuthCard
      title="Esqueceu sua senha?"
      description="Enviaremos um link para redefinir sua senha"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
