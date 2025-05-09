
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type SalesGoalProps = {
  current: number;
  goal: number;
  className?: string;
};

export default function SalesGoal({ current, goal, className }: SalesGoalProps) {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  
  // Determine status text and color based on percentage
  const getStatusInfo = () => {
    if (percentage >= 100) return { text: "Meta atingida!", color: "text-green-500" };
    if (percentage >= 75) return { text: "Meta próxima!", color: "text-hta-highlight" };
    if (percentage >= 50) return { text: "Em andamento", color: "text-hta-highlight/80" };
    return { text: "Falta atingir", color: "text-gray-400" };
  };
  
  const status = getStatusInfo();

  return (
    <div className={cn("rounded-lg card-gradient border border-hta-gray-dark p-4", className)}>
      <div className="flex items-center mb-4">
        <span className="text-hta-highlight">🎯</span>
        <h2 className="text-lg font-bold ml-2">Meta de Vendas</h2>
      </div>
      
      <div className="mb-2 flex justify-between items-end">
        <div>
          <span className="text-sm text-gray-400">Atual</span>
          <p className="text-xl font-bold text-hta-highlight">
            R$ {current.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-400">Meta</span>
          <p className="text-xl font-bold">
            R$ {goal.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
      
      <Progress value={percentage} className="h-2 mb-2" />
      
      <div className="flex justify-between items-center">
        <span className={cn("text-sm font-medium", status.color)}>
          {status.text}
        </span>
        <span className="text-sm font-bold">{percentage}%</span>
      </div>
    </div>
  );
}
