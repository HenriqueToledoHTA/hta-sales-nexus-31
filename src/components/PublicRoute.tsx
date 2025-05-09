
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-hta-highlight" />
      </div>
    );
  }

  if (user) {
    // Se o usuário já estiver autenticado, redireciona para a página principal
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
