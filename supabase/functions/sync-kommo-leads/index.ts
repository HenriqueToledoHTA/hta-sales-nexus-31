
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

// CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define types for better code quality
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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const kommoApiToken = Deno.env.get("KOMMO_API_TOKEN");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://ujxennrfkatyxgevlecb.supabase.co";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqeGVubnJma2F0eXhnZXZsZWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDMxNjAsImV4cCI6MjA2MjM3OTE2MH0.Ftt-Er-gJDK_9J6uVFH5iwpoJKMKR-fACp-qp0I9cZg";

    if (!kommoApiToken) {
      throw new Error("KOMMO_API_TOKEN is required");
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Define the pipeline IDs to filter
    const pipelineIds = [8289155, 10219280, 10219919];
    const limit = 250;
    
    // Track statistics for logs
    const stats = {
      totalLeads: 0,
      created: 0,
      updated: 0,
      errors: 0,
      pages: 0
    };

    // Initialize paging
    let currentPage = 1;
    let hasMorePages = true;

    // Base URL for the Kommo API
    const baseUrl = "https://hta.kommo.com/api/v4/leads";

    // Fetch all pages of leads
    while (hasMorePages) {
      console.log(`Fetching page ${currentPage}...`);
      stats.pages++;

      // Build query params for the API request
      const queryParams = new URLSearchParams();
      pipelineIds.forEach((id, index) => {
        queryParams.append(`filter[pipeline_id][${index}]`, id.toString());
      });
      queryParams.append("page", currentPage.toString());
      queryParams.append("limit", limit.toString());

      // Make the API request to Kommo
      const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${kommoApiToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch leads: ${response.status} - ${error}`);
      }

      // Parse the response
      const data = await response.json() as KommoApiResponse;
      const leads = data._embedded.leads;
      stats.totalLeads += leads.length;

      console.log(`Retrieved ${leads.length} leads from page ${currentPage}`);

      // Process and upsert leads to Supabase
      for (const lead of leads) {
        try {
          // Convert _links to string if it's an object
          if (lead._links && typeof lead._links === 'object') {
            lead._links = JSON.stringify(lead._links);
          }

          // Convert custom_fields_values to string if it's an object
          if (lead.custom_fields_values && typeof lead.custom_fields_values === 'object') {
            lead.custom_fields_values = JSON.stringify(lead.custom_fields_values);
          }

          // Upsert lead to Supabase
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
            console.error(`Error upserting lead ${lead.id}:`, error);
            stats.errors++;
          } else {
            // If lead already existed, count as updated, otherwise as created
            // Note: This is approximate as we don't have a way to know for sure if it was an insert or update
            if (currentPage === 1) {
              stats.created++;
            } else {
              stats.updated++;
            }
          }
        } catch (error) {
          console.error(`Error processing lead ${lead.id}:`, error);
          stats.errors++;
        }
      }

      // Check if we need to fetch more pages
      currentPage++;
      // If current page is greater than total pages or no leads returned, stop
      hasMorePages = data._page && leads.length > 0;
    }

    // Return success response with stats
    return new Response(
      JSON.stringify({
        success: true,
        message: "Leads sync completed successfully",
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
    console.error("Error in sync-kommo-leads function:", error);
    
    // Return error response
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
