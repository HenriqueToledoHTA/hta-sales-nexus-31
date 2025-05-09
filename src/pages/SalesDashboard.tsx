
import { useState, useEffect } from 'react';
import { DollarSign, Users, ShoppingCart } from 'lucide-react';
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import TopSellersTable from "../components/dashboard/TopSellersTable";
import RecentSales from "../components/dashboard/RecentSales";
import ProductDistributionChart from "../components/dashboard/ProductDistributionChart";
import DistributionPieChart from "../components/dashboard/DistributionPieChart";
import SalesGoal from "../components/dashboard/SalesGoal";
import { fetchSalesStats, formatCurrency } from "../services/salesService";

import {
  topSellers,
  recentSales,
  productDistribution,
  professionDistribution,
  acquisitionChannels,
  salesGoal as goalData
} from "../data/mockData";

export default function SalesDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [salesStats, setSalesStats] = useState({
    totalSales: 0,
    totalCustomers: 0,
    averageSale: 0,
    salesChange: 0,
    customersChange: 0,
    averageChange: 0
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const stats = await fetchSalesStats();
        
        // For now, we'll set changes to default values
        // In a real implementation, you would compare with previous period
        setSalesStats({
          ...stats,
          salesChange: 15, // Placeholder values
          customersChange: 10,
          averageChange: 5
        });
      } catch (error) {
        console.error("Failed to load sales data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard de Vendas</h1>
        <div className="text-sm text-gray-400">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total em Vendas"
          value={isLoading ? "Carregando..." : formatCurrency(salesStats.totalSales)}
          icon={<DollarSign />}
          change={{ value: salesStats.salesChange, isPositive: true }}
        />
        <StatCard
          title="Total de Clientes"
          value={isLoading ? "Carregando..." : String(salesStats.totalCustomers)}
          icon={<Users />}
          change={{ value: salesStats.customersChange, isPositive: true }}
        />
        <StatCard
          title="Valor Médio por Venda"
          value={isLoading ? "Carregando..." : formatCurrency(salesStats.averageSale)}
          icon={<ShoppingCart />}
          change={{ value: salesStats.averageChange, isPositive: true }}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product distribution chart (swapped position) */}
          <ProductDistributionChart data={productDistribution} />
          
          {/* Distribution pie charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DistributionPieChart
              data={professionDistribution}
              title="Distribuição percentual de vendas por profissão"
              icon="👤"
              type="profession"
            />
            <DistributionPieChart
              data={acquisitionChannels}
              title="Vendas por canal de aquisição"
              icon="📱"
              type="channel"
            />
          </div>
          
          {/* Recent sales */}
          <RecentSales sales={recentSales} />
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Sales goal */}
          <SalesGoal current={goalData.current} goal={goalData.goal} />
          
          {/* Top sellers table (swapped position) */}
          <TopSellersTable sellers={topSellers} />
        </div>
      </div>
    </DashboardLayout>
  );
}
