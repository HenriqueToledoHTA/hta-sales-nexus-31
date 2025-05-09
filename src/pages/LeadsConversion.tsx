
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import FunnelVisualization from "../components/leads/FunnelVisualization";
import LeadsFunnelMetrics from "../components/leads/LeadsFunnelMetrics";
import RecentLeadsTable from "../components/leads/RecentLeadsTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 
import { Button } from "@/components/ui/button";
import { ChartBarIcon, ChartPieIcon, ArrowRightIcon } from "lucide-react";

export default function LeadsConversion() {
  const [activeView, setActiveView] = useState<"funnel" | "charts">("funnel");
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Funil de Conversão de Leads</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visualização do fluxo de leads únicos através das 8 etapas do funil (3002 leads únicos) / 6054 total
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "funnel" | "charts")}>
              <TabsList className="bg-hta-dark-card-hover">
                <TabsTrigger value="funnel" className="data-[state=active]:bg-hta-highlight data-[state=active]:text-black">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ChartBarIcon size={16} />
                    <span>Funil</span>
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="charts" className="data-[state=active]:bg-hta-highlight data-[state=active]:text-black">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ChartPieIcon size={16} />
                    <span>Gráficos</span>
                  </Button>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" className="gap-2">
              <span>Transições</span>
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="space-y-6">
          {activeView === "funnel" && (
            <>
              <FunnelVisualization />
              <LeadsFunnelMetrics />
              <RecentLeadsTable />
            </>
          )}
          
          {activeView === "charts" && (
            <div className="flex items-center justify-center h-[70vh] card-gradient rounded-lg border border-hta-gray-dark">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Visualização de Gráficos</h2>
                <p className="text-gray-400">Esta visualização será implementada em breve.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
