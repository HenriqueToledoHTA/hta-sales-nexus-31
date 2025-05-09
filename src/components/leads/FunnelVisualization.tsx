
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Funnel stage data type
type FunnelStage = {
  id: number;
  name: string;
  color: string;
  leads: number;
  percentage: number;
  transition: {
    count: number;
    percentage: number;
  };
};

export default function FunnelVisualization() {
  // This would normally come from an API
  const [stages, setStages] = useState<FunnelStage[]>([
    { 
      id: 1, 
      name: "COMPROU FELPUDO", 
      color: "bg-amber-600", 
      leads: 77, 
      percentage: 2.6,
      transition: { count: 73, percentage: 8.2 } 
    },
    { 
      id: 2, 
      name: "DISPAROU FORMS", 
      color: "bg-amber-500", 
      leads: 363, 
      percentage: 12.1,
      transition: { count: 106, percentage: 30.6 } 
    },
    { 
      id: 3, 
      name: "PREENCHEU FORMS", 
      color: "bg-amber-500", 
      leads: 1331, 
      percentage: 44.3,
      transition: { count: 622, percentage: 52.0 } 
    },
    { 
      id: 4, 
      name: "PRÉ QUALIFICADO", 
      color: "bg-amber-500", 
      leads: 416, 
      percentage: 13.9,
      transition: { count: 153, percentage: 15.0 } 
    },
    { 
      id: 5, 
      name: "QUALIFICADO", 
      color: "bg-amber-500", 
      leads: 161, 
      percentage: 5.4,
      transition: { count: 230, percentage: 76.7 } 
    },
    { 
      id: 6, 
      name: "CALL AGENDADA", 
      color: "bg-amber-500", 
      leads: 383, 
      percentage: 12.8,
      transition: { count: 173, percentage: 30.0 } 
    },
    { 
      id: 7, 
      name: "CALL REALIZADA", 
      color: "bg-amber-500", 
      leads: 174, 
      percentage: 5.8,
      transition: { count: 46, percentage: 26.6 } 
    },
    { 
      id: 8, 
      name: "VENDA REALIZADA", 
      color: "bg-green-600", 
      leads: 97, 
      percentage: 3.2,
      transition: { count: 0, percentage: 0 } 
    },
  ]);

  // Add animation effect
  const [animatedStages, setAnimatedStages] = useState<FunnelStage[]>([]);

  useEffect(() => {
    setAnimatedStages([]);
    
    // Animate in the stages one after another
    const timer = setTimeout(() => {
      setAnimatedStages(stages);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [stages]);

  return (
    <div className="rounded-lg card-gradient border border-hta-gray-dark overflow-hidden">
      <div className="p-4">
        {animatedStages.map((stage, index) => (
          <div key={stage.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className={cn(
                  "w-5 h-5 flex items-center justify-center rounded-sm text-xs font-medium mr-2",
                  stage.id === 8 ? "bg-green-600" : "bg-amber-600"
                )}>
                  {stage.id}
                </div>
                <span className="font-medium text-sm">{stage.name}</span>
                <span className="ml-4 text-sm font-bold">{stage.leads} leads</span>
              </div>
              <span className="text-sm font-bold">{stage.leads} leads</span>
            </div>
            
            {/* Progress bar */}
            <div className="relative h-8 mb-1">
              <div className="absolute inset-0 bg-hta-dark-card rounded-md"></div>
              <div 
                className={cn(
                  "absolute h-full rounded-md transition-all duration-1000",
                  stage.id === 8 ? "bg-green-600" : "bg-amber-600"
                )}
                style={{ width: `${stage.percentage}%` }}
              >
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-bold">
                  {stage.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            
            {/* Transition arrow */}
            {index < stages.length - 1 && (
              <div className="flex items-center ml-6 mb-2">
                <div className="h-6 border-l border-dashed border-hta-gray-medium"></div>
                <div className="ml-2 text-xs text-muted-foreground">
                  → {stage.transition.count} leads ({stage.transition.percentage.toFixed(1)}%)
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
