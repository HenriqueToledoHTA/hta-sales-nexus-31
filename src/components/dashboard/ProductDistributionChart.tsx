
import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type ProductData = {
  name: string;
  value: number;
};

type ProductDistributionChartProps = {
  data: ProductData[];
  className?: string;
};

export default function ProductDistributionChart({ data, className }: ProductDistributionChartProps) {
  const [chartData, setChartData] = useState<ProductData[]>([]);

  // Add animation effect
  useEffect(() => {
    setChartData([]);
    
    const timer = setTimeout(() => {
      setChartData(data);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-hta-dark-card p-3 rounded-md border border-hta-gray-dark">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-hta-highlight">
            {payload[0].value} vendas
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className={cn("rounded-lg card-gradient border border-hta-gray-dark p-4", className)}>
      <div className="flex items-center mb-4">
        <span className="text-hta-highlight">📊</span>
        <h2 className="text-lg font-bold ml-2">Distribuição de vendas por produto</h2>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#999999', fontSize: 12 }}
              axisLine={{ stroke: '#333333' }}
              tickLine={{ stroke: '#333333' }}
            />
            <YAxis 
              tick={{ fill: '#999999', fontSize: 12 }}
              axisLine={{ stroke: '#333333' }}
              tickLine={{ stroke: '#333333' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#F5A623" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
