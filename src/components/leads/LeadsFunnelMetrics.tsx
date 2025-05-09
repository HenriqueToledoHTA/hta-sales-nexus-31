
import { Card, CardContent } from "@/components/ui/card";

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
      subtext: "47.1%",
      highlight: true
    },
    {
      title: "Melhor conversão",
      value: "Etapa 2: DISPAROU FORMS",
      subtext: "47.1%",
      highlight: true
    },
    {
      title: "Pior conversão",
      value: "Etapa 4: PRÉ QUALIFICADO",
      subtext: "11.1%",
      highlight: false,
      negative: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-hta-dark-card border-hta-gray-dark overflow-hidden">
          <CardContent className="p-4">
            <h3 className="text-sm text-muted-foreground">{metric.title}</h3>
            <p className={`text-xl font-bold mt-1 ${metric.highlight ? 'text-hta-highlight' : ''} ${metric.negative ? 'text-red-500' : ''}`}>
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
