
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <AuthCard
      title="Bem-vindo de volta"
      description="Entre na sua conta para continuar"
    >
      <LoginForm />
    </AuthCard>
  );
}
