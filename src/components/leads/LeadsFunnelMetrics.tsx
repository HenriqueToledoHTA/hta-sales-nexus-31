
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LeadsFunnelMetrics() {
  const metrics = [
    {
      title: "Total de leads",
      value: "3002",
      highlight: false
    },
    {
      title: "Etapa com mais leads",
      value: "Etapa 3 (1331)",
      subtext: "44.3%",
      highlight: true
    },
    {
      title: "Melhor conversão",
      value: "Etapa 5: QUALIFICADO",
      subtext: "76.7%",
      highlight: true
    },
    {
      title: "Pior conversão",
      value: "Etapa 1: COMPROU FELPUDO",
      subtext: "8.2%",
      negative: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card 
          key={index} 
          className={cn(
            "bg-card border-hta-gray-dark overflow-hidden", // Updated from bg-hta-dark-card to bg-card
            metric.highlight ? "border-l-4 border-l-hta-highlight" : "",
            metric.negative ? "border-l-4 border-l-red-500" : ""
          )}
        >
          <CardContent className="p-4">
            <h3 className="text-sm text-muted-foreground">{metric.title}</h3>
            <p className={`text-xl font-bold mt-2 ${metric.highlight ? 'text-hta-highlight' : ''} ${metric.negative ? 'text-red-500' : ''}`}>
              {metric.value}
            </p>
            {metric.subtext && (
              <p className={`text-sm font-medium mt-1 ${metric.highlight ? 'text-hta-highlight' : ''} ${metric.negative ? 'text-red-500' : ''}`}>
                {metric.subtext}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Helper function to conditionally join class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
