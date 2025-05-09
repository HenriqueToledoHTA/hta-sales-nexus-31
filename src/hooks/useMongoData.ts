import { useState, useEffect } from 'react';
import { fetchLeads, fetchLeadsByStage } from '../services/mongoService';
import { useToast } from "@/components/ui/use-toast";

// Define types for leads data
interface Lead {
  id: number;
  name: string;
  price: number;
  status_id: number;
  pipeline_id: number;
  created_at: number;
  updated_at: number;
  [key: string]: any; // For other properties
}

interface StageData {
  _id: {
    status_id: number;
    pipeline_id: number;
  };
  count: number;
}

export function useLeads(limit = 20, skip = 0) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        const data = await fetchLeads(limit, skip);
        setLeads(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching leads:", err);
        setError(err);
        toast({
          title: "Error fetching leads",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [limit, skip, toast]);

  return { leads, loading, error };
}

export function useLeadsByStage() {
  const [stageData, setStageData] = useState<StageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadStageData() {
      try {
        setLoading(true);
        const data = await fetchLeadsByStage();
        setStageData(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching stage data:", err);
        setError(err);
        toast({
          title: "Error fetching stage data",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadStageData();
  }, [toast]);

  return { stageData, loading, error };
}
