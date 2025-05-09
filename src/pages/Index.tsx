
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface SyncStats {
  totalLeads: number;
  created: number;
  updated: number;
  errors: number;
  pages: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    stats?: SyncStats;
    error?: string;
  } | null>(null);
  const { toast } = useToast();

  const syncLeads = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      console.log("Iniciando chamada para a função sync-kommo-leads");
      
      const { data, error } = await supabase.functions.invoke('sync-kommo-leads', {
        method: 'POST',
      });
      
      console.log("Resposta recebida:", { data, error });
      
      if (error) {
        console.error("Erro retornado pela função:", error);
        throw error;
      }
      
      setResult(data);
      
      if (data.success) {
        toast({
          title: "Sincronização concluída",
          description: `${data.stats?.totalLeads || 0} leads processados com sucesso!`,
          variant: "default",
        });
      } else {
        toast({
          title: "Erro na sincronização",
          description: data.error || "Ocorreu um erro desconhecido",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao chamar a função:", error);
      setResult({
        success: false,
        message: "Falha ao executar a sincronização",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      });
      
      toast({
        title: "Erro na sincronização",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Teste de Sincronização de Leads Kommo</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sincronizar Leads da Kommo</CardTitle>
            <CardDescription>
              Esta ação irá buscar todos os leads dos pipelines 8289155, 10219280 e 10219919 da Kommo 
              e sincronizar com a tabela de leads do Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              A operação pode demorar alguns minutos dependendo da quantidade de leads a serem sincronizados.
              Os resultados serão exibidos abaixo após a conclusão.
            </p>
            <Button 
              onClick={syncLeads} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                'Iniciar Sincronização'
              )}
            </Button>
          </CardContent>
        </Card>
        
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.success ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Sincronização Concluída
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    Erro na Sincronização
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {result.message}
              </CardDescription>
            </CardHeader>
            
            {result.success && result.stats && (
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total de Leads</p>
                    <p className="text-2xl font-bold">{result.stats.totalLeads}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Criados</p>
                    <p className="text-2xl font-bold">{result.stats.created}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Atualizados</p>
                    <p className="text-2xl font-bold">{result.stats.updated}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Erros</p>
                    <p className="text-2xl font-bold">{result.stats.errors}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Páginas</p>
                    <p className="text-2xl font-bold">{result.stats.pages}</p>
                  </div>
                </div>
              </CardContent>
            )}
            
            {!result.success && result.error && (
              <CardContent>
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md overflow-auto">
                  <pre className="whitespace-pre-wrap">{result.error}</pre>
                </div>
              </CardContent>
            )}
            
            <CardFooter className="flex justify-end">
              <p className="text-xs text-gray-500">
                {new Date().toLocaleString('pt-BR')}
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;
