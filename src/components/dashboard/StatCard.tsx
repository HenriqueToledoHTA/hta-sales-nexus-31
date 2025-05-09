
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  change: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export default function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <div className={cn(
      "p-6 rounded-lg card-gradient border border-hta-gray-dark",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium flex items-center",
                change.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {change.isPositive ? (
                <ArrowUp size={14} className="mr-1" />
              ) : (
                <ArrowDown size={14} className="mr-1" />
              )}
              {Math.abs(change.value)}% vs último período
            </span>
          </div>
        </div>
        <div className="p-3 rounded-full bg-hta-dark-card-hover text-hta-highlight">
          {icon}
        </div>
      </div>
    </div>
  );
}
