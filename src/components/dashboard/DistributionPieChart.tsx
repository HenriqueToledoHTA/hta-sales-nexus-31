
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Custom color palettes
const PROFESSION_COLORS = ['#F5A623', '#F87C3D', '#EA5959', '#9B63F8', '#6376F8', '#63C7F8', '#898989'];
const CHANNEL_COLORS = ['#F5A623', '#F87C3D', '#EA5959', '#9B63F8', '#6376F8', '#63C7F8', '#898989'];

type ChartData = {
  name: string;
  value: number;
};

type DistributionPieChartProps = {
  data: ChartData[];
  title: string;
  icon: string;
  type: 'profession' | 'channel';
  className?: string;
};

export default function DistributionPieChart({ 
  data, 
  title, 
  icon, 
  type,
  className 
}: DistributionPieChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  // Choose color array based on type
  const colorArray = type === 'profession' ? PROFESSION_COLORS : CHANNEL_COLORS;

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
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-hta-highlight">
            {payload[0].value}%
          </p>
        </div>
      );
    }
  
    return null;
  };
  
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-400">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("rounded-lg card-gradient border border-hta-gray-dark p-4", className)}>
      <div className="flex items-center mb-2">
        <span className="text-hta-highlight">{icon}</span>
        <h2 className="text-lg font-bold ml-2">{title}</h2>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colorArray[index % colorArray.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
