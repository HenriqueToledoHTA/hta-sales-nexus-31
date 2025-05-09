
import { useState, useEffect } from 'react';
import { fetchLeads, fetchLeadsByStage } from '../services/mongoService';

export function useLeads(limit = 20, skip = 0) {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        const data = await fetchLeads(limit, skip);
        setLeads(data);
        setError(null);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [limit, skip]);

  return { leads, loading, error };
}

export function useLeadsByStage() {
  const [stageData, setStageData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadStageData() {
      try {
        setLoading(true);
        const data = await fetchLeadsByStage();
        setStageData(data);
        setError(null);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadStageData();
  }, []);

  return { stageData, loading, error };
}
