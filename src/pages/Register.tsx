
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthCard
      title="Criar conta"
      description="Registre-se para acessar o sistema"
    >
      <RegisterForm />
    </AuthCard>
  );
}
