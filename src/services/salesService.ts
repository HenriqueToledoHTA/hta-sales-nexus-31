
import { supabase } from "@/integrations/supabase/client";

export interface SalesStats {
  totalSales: number;
  totalCustomers: number;
  averageSale: number;
}

export interface TopSeller {
  id: number;
  name: string;
  sales: number;
  value: number;
}

export async function fetchSalesStats(): Promise<SalesStats> {
  try {
    // Get total sales (sum of price where price > 0)
    const { data: salesData, error: salesError } = await supabase
      .from('leads')
      .select('price')
      .gt('price', 0);
    
    if (salesError) throw salesError;
    
    // Calculate total sales
    const totalSales = salesData.reduce((sum, lead) => sum + (lead.price || 0), 0);
    
    // Count total customers (leads with price > 0)
    const totalCustomers = salesData.length;
    
    // Calculate average sale
    const averageSale = totalCustomers > 0 ? totalSales / totalCustomers : 0;
    
    return {
      totalSales,
      totalCustomers,
      averageSale
    };
  } catch (error) {
    console.error("Error fetching sales stats:", error);
    return {
      totalSales: 0,
      totalCustomers: 0,
      averageSale: 0
    };
  }
}

export async function fetchTopSellers(): Promise<TopSeller[]> {
  try {
    const { data, error } = await supabase
      .from('seller_sales_summary')
      .select('*')
      .order('sales_total', { ascending: false })
      .limit(5);
    
    if (error) throw error;
    
    // Transform the data to match the TopSeller interface
    return data.map((seller, index) => ({
      id: index + 1, // Setting position in ranking
      name: seller.seller_name,
      sales: seller.sales_count,
      value: seller.sales_total
    }));
  } catch (error) {
    console.error("Error fetching top sellers:", error);
    return [];
  }
}

// Format currency in Brazilian Real (BRL)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
