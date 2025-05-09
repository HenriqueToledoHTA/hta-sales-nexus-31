
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import FunnelVisualization from "../components/leads/FunnelVisualization";
import LeadsFunnelMetrics from "../components/leads/LeadsFunnelMetrics";
import RecentLeadsTable from "../components/leads/RecentLeadsTable";
import FunnelTransitions from "../components/leads/FunnelTransitions";

export default function LeadsConversion() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="mb-2">
          <h1 className="text-2xl md:text-3xl font-bold">Funil de Conversão de Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visualização do fluxo de leads únicos através das 8 etapas do funil (3002 leads únicos) / 6054 total
          </p>
        </div>
        
        {/* Two-column layout for funnel visualization and transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunnelVisualization />
          <FunnelTransitions />
        </div>
        
        {/* Metrics and table below */}
        <LeadsFunnelMetrics />
        <RecentLeadsTable />
      </div>
    </DashboardLayout>
  );
}
