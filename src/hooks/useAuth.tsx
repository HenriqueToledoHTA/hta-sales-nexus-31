
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Primeiro configuramos o listener para mudanças de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Não chamamos APIs do Supabase diretamente aqui para evitar deadlocks
        setTimeout(() => {
          if (event === 'SIGNED_IN' && currentSession) {
            navigate('/');
          } else if (event === 'SIGNED_OUT') {
            navigate('/login');
          }
        }, 0);
      }
    );

    // Em seguida, verificamos a sessão existente
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Limpeza ao desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Função para login
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      toast({
        title: "Login bem-sucedido",
        description: "Você foi autenticado com sucesso.",
        variant: "default",
      });
    } catch (error: any) {
      let message = "Falha ao fazer login";
      if (error.message) {
        if (error.message.includes("Invalid login credentials")) {
          message = "Email ou senha inválidos";
        } else if (error.message.includes("rate limited")) {
          message = "Muitas tentativas de login. Tente novamente mais tarde.";
        }
      }
      
      toast({
        title: "Erro de login",
        description: message,
        variant: "destructive",
      });
      
      throw error;
    }
  };

  // Função para logout
  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
        variant: "default",
      });
    } catch (error) {
      console.error("Logout error:", error);
      
      toast({
        title: "Erro ao sair",
        description: "Houve um problema ao fazer logout.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  // Função para resetar senha
  const resetPassword = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email enviado",
        description: "Verifique seu email para redefinir sua senha.",
        variant: "default",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      
      toast({
        title: "Erro",
        description: "Não foi possível enviar o email de redefinição de senha.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  // Função para atualizar senha
  const updatePassword = async (newPassword: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso.",
        variant: "default",
      });
      
      // Redireciona para a página de login após a alteração de senha
      navigate('/login');
    } catch (error) {
      console.error("Update password error:", error);
      
      toast({
        title: "Erro",
        description: "Não foi possível atualizar sua senha.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
