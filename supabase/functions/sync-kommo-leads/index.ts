
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

// CORS headers para acesso no navegador
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define tipos para melhorar a qualidade do código
interface KommoLead {
  id: number;
  name: string;
  price?: number;
  responsible_user_id?: number;
  group_id?: number;
  status_id?: number;
  pipeline_id?: number;
  loss_reason_id?: number;
  created_by?: number;
  updated_by?: number;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
  closest_task_at?: string;
  is_deleted?: boolean;
  custom_fields_values?: string;
  score?: number;
  account_id?: number;
  labor_cost?: number;
  _links?: string;
}

interface KommoApiResponse {
  _page: number;
  _links: { self: { href: string } };
  _embedded: { leads: KommoLead[] };
}

serve(async (req: Request) => {
  console.log("Função sync-kommo-leads chamada", { method: req.method });
  
  // Lidar com solicitações CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Obter variáveis de ambiente
    const kommoApiToken = Deno.env.get("KOMMO_API_TOKEN");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://ujxennrfkatyxgevlecb.supabase.co";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqeGVubnJma2F0eXhnZXZsZWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDMxNjAsImV4cCI6MjA2MjM3OTE2MH0.Ftt-Er-gJDK_9J6uVFH5iwpoJKMKR-fACp-qp0I9cZg";

    console.log("Verificando configurações", { 
      temToken: Boolean(kommoApiToken), 
      temSupabaseUrl: Boolean(supabaseUrl), 
      temSupabaseKey: Boolean(supabaseAnonKey) 
    });

    if (!kommoApiToken) {
      throw new Error("KOMMO_API_TOKEN é necessário");
    }

    // Inicializar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Definir os IDs de pipeline para filtrar
    const pipelineIds = [8289155, 10219280, 10219919];
    const limit = 250;
    
    // Rastrear estatísticas para logs
    const stats = {
      totalLeads: 0,
      created: 0,
      updated: 0,
      errors: 0,
      pages: 0
    };

    // Inicializar paginação
    let currentPage = 1;
    let hasMorePages = true;

    // URL base para a API da Kommo
    const baseUrl = "https://hta.kommo.com/api/v4/leads";

    // Buscar todas as páginas de leads
    while (hasMorePages) {
      console.log(`Buscando página ${currentPage}...`);
      stats.pages++;

      // Construir parâmetros de consulta para a solicitação da API
      const queryParams = new URLSearchParams();
      pipelineIds.forEach((id, index) => {
        queryParams.append(`filter[pipeline_id][${index}]`, id.toString());
      });
      queryParams.append("page", currentPage.toString());
      queryParams.append("limit", limit.toString());

      const apiUrl = `${baseUrl}?${queryParams.toString()}`;
      console.log("Chamando API Kommo:", apiUrl);

      // Fazer a solicitação para a API da Kommo
      const response = await fetch(apiUrl, {
        headers: {
          "Authorization": `Bearer ${kommoApiToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Resposta de erro da API:", { status: response.status, body: error });
        throw new Error(`Falha ao buscar leads: ${response.status} - ${error}`);
      }

      // Analisar a resposta
      const data = await response.json() as KommoApiResponse;
      const leads = data._embedded.leads;
      stats.totalLeads += leads.length;

      console.log(`Obtidos ${leads.length} leads da página ${currentPage}`);

      // Processar e inserir leads no Supabase
      for (const lead of leads) {
        try {
          // Converter _links para string se for um objeto
          if (lead._links && typeof lead._links === 'object') {
            lead._links = JSON.stringify(lead._links);
          }

          // Converter custom_fields_values para string se for um objeto
          if (lead.custom_fields_values && typeof lead.custom_fields_values === 'object') {
            lead.custom_fields_values = JSON.stringify(lead.custom_fields_values);
          }

          console.log(`Processando lead ${lead.id}: ${lead.name}`);

          // Inserir lead no Supabase
          const { error } = await supabase
            .from('leads')
            .upsert({
              id: lead.id,
              name: lead.name,
              price: lead.price,
              responsible_user_id: lead.responsible_user_id,
              group_id: lead.group_id,
              status_id: lead.status_id,
              pipeline_id: lead.pipeline_id,
              loss_reason_id: lead.loss_reason_id,
              created_by: lead.created_by,
              updated_by: lead.updated_by,
              created_at: lead.created_at,
              updated_at: lead.updated_at,
              closed_at: lead.closed_at,
              closest_task_at: lead.closest_task_at,
              is_deleted: lead.is_deleted,
              custom_fields_values: lead.custom_fields_values,
              score: lead.score,
              account_id: lead.account_id,
              labor_cost: lead.labor_cost,
              _links: lead._links
            });

          if (error) {
            console.error(`Erro ao inserir lead ${lead.id}:`, error);
            stats.errors++;
          } else {
            // Se o lead já existia, contar como atualizado, caso contrário como criado
            // Nota: Isso é aproximado, pois não temos uma maneira de saber com certeza se foi uma inserção ou atualização
            if (currentPage === 1) {
              stats.created++;
            } else {
              stats.updated++;
            }
          }
        } catch (error) {
          console.error(`Erro ao processar lead ${lead.id}:`, error);
          stats.errors++;
        }
      }

      // Verificar se precisamos buscar mais páginas
      currentPage++;
      // Se a página atual for maior que o total de páginas ou nenhum lead retornado, parar
      hasMorePages = data._page && leads.length > 0;
    }

    console.log("Sincronização concluída com sucesso", stats);

    // Retornar resposta de sucesso com estatísticas
    return new Response(
      JSON.stringify({
        success: true,
        message: "Sincronização de leads concluída com sucesso",
        stats
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 200
      }
    );
  } catch (error) {
    console.error("Erro na função sync-kommo-leads:", error);
    
    // Retornar resposta de erro
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 500
      }
    );
  }
});
