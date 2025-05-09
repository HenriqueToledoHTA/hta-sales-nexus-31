
import { useState } from 'react';
import { DollarSign, Users, ShoppingCart } from 'lucide-react';
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import TopSellersTable from "../components/dashboard/TopSellersTable";
import RecentSales from "../components/dashboard/RecentSales";
import ProductDistributionChart from "../components/dashboard/ProductDistributionChart";
import DistributionPieChart from "../components/dashboard/DistributionPieChart";
import SalesGoal from "../components/dashboard/SalesGoal";

import {
  salesStats,
  topSellers,
  recentSales,
  productDistribution,
  professionDistribution,
  acquisitionChannels,
  salesGoal as goalData
} from "../data/mockData";

export default function SalesDashboard() {
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
          value={salesStats.totalSales}
          icon={<DollarSign />}
          change={{ value: salesStats.salesChange, isPositive: true }}
        />
        <StatCard
          title="Total de Clientes"
          value={salesStats.totalCustomers}
          icon={<Users />}
          change={{ value: salesStats.customersChange, isPositive: true }}
        />
        <StatCard
          title="Valor Médio por Venda"
          value={salesStats.averageSale}
          icon={<ShoppingCart />}
          change={{ value: salesStats.averageChange, isPositive: true }}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top sellers table (swapped position) */}
          <TopSellersTable sellers={topSellers} />
          
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
          
          {/* Product distribution chart (swapped position) */}
          <ProductDistributionChart data={productDistribution} />
        </div>
      </div>
    </DashboardLayout>
  );
}
