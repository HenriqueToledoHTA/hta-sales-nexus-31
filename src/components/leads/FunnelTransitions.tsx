
import { cn } from "@/lib/utils";

type FunnelTransition = {
  fromStage: {
    id: number;
    name: string;
    leads: number;
  };
  toStage: {
    id: number;
    name: string;
  };
  transitionLeads: number;
  conversionRate: number;
};

export default function FunnelTransitions() {
  // This would normally come from an API
  const transitions: FunnelTransition[] = [
    {
      fromStage: { id: 1, name: "Etapa 1", leads: 73 },
      toStage: { id: 2, name: "Etapa 2" },
      transitionLeads: 73,
      conversionRate: 8.2
    },
    {
      fromStage: { id: 2, name: "Etapa 2", leads: 106 },
      toStage: { id: 3, name: "Etapa 3" },
      transitionLeads: 106,
      conversionRate: 30.6
    },
    {
      fromStage: { id: 3, name: "Etapa 3", leads: 622 },
      toStage: { id: 4, name: "Etapa 4" },
      transitionLeads: 622,
      conversionRate: 52.0
    },
    {
      fromStage: { id: 4, name: "Etapa 4", leads: 153 },
      toStage: { id: 5, name: "Etapa 5" },
      transitionLeads: 153,
      conversionRate: 15.0
    },
    {
      fromStage: { id: 5, name: "Etapa 5", leads: 230 },
      toStage: { id: 6, name: "Etapa 6" },
      transitionLeads: 230,
      conversionRate: 76.7
    },
    {
      fromStage: { id: 6, name: "Etapa 6", leads: 173 },
      toStage: { id: 7, name: "Etapa 7" },
      transitionLeads: 173,
      conversionRate: 30.0
    },
    {
      fromStage: { id: 7, name: "Etapa 7", leads: 46 },
      toStage: { id: 8, name: "Etapa 8" },
      transitionLeads: 46,
      conversionRate: 26.6
    },
  ];

  // Helper function to determine the color class for conversion rate
  const getConversionRateColor = (rate: number) => {
    if (rate >= 50) return "bg-green-600 text-white";
    if (rate >= 25) return "bg-amber-600 text-white";
    return "bg-red-600 text-white";
  };

  return (
    <div className="rounded-lg card-gradient border border-hta-gray-dark p-4">
      <h2 className="text-lg font-bold mb-4">Transições entre etapas sequenciais (7 transições encontradas)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transitions.map((transition) => (
          <div 
            key={`${transition.fromStage.id}-${transition.toStage.id}`}
            className="bg-hta-dark-card border border-hta-gray-dark rounded-lg p-3"
          >
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-600 rounded-sm text-xs text-white font-medium">
                  {transition.fromStage.id}
                </span>
                <span className="ml-2 text-sm">{transition.fromStage.name}</span>
              </div>
              <span className="mx-2 text-gray-400">{transition.fromStage.leads} leads</span>
              <span className="mx-2">→</span>
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-600 rounded-sm text-xs text-white font-medium">
                  {transition.toStage.id}
                </span>
                <span className="ml-2 text-sm">{transition.toStage.name}</span>
              </div>
            </div>
            
            <div className="mt-2 flex justify-end">
              <span 
                className={cn(
                  "text-xs py-1 px-2 rounded",
                  getConversionRateColor(transition.conversionRate)
                )}
              >
                {transition.conversionRate.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
