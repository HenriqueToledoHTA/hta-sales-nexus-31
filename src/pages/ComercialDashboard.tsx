
import { useState, useEffect } from 'react';
import { Calendar, PhoneCall, Users, AlertTriangle } from 'lucide-react';
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock data based on the reference images
const mockCalls = {
  scheduled: 672,
  completed: 182,
  noShows: 490,
  noShowRate: 72.9,
  completionRate: 27.1
};

const mockSales = {
  conversionRate: 27.5,
  completed: 185,
  averageTicket: 'R$ 15.813',
  performance: 65
};

const mockClosers = [
  { name: 'Aquila Paul', scheduledCalls: 197, completedCalls: 18, noShowRate: '0.0%' },
  { name: 'Douglas Grimaldi', scheduledCalls: 104, completedCalls: 32, noShowRate: '0.0%' },
  { name: 'Felipe Pontes', scheduledCalls: 95, completedCalls: 36, noShowRate: '0.0%' },
  { name: 'Gabriella Sufuente', scheduledCalls: 88, completedCalls: 36, noShowRate: '0.0%' },
  { name: 'Dennis Okada', scheduledCalls: 56, completedCalls: 22, noShowRate: '0.0%' }
];

const mockProfessionData = [
  { name: 'Médico', value: 12 },
  { name: 'Médico Cardiologista', value: 4 },
  { name: 'Empresário', value: 3 },
  { name: 'Advogado', value: 2 },
  { name: 'Terapeuta', value: 2 },
  { name: 'Astrólogo', value: 2 },
  { name: 'Professor', value: 1 },
  { name: 'Psicólogo', value: 1 },
  { name: 'Personal Trainer', value: 1 },
  { name: 'Piloto', value: 1 }
];

const mockRevenueData = [
  { name: 'Categoria 1', value: 35 },
  { name: 'Categoria 2', value: 25 },
  { name: 'Categoria 3', value: 20 },
  { name: 'Categoria 4', value: 15 },
  { name: 'Categoria 5', value: 5 }
];

const mockDailyCallsData = [
  { date: '4 de abr. de 2025', scheduled: 6, completed: 1, sales: 8 },
  { date: '7 de abr. de 2025', scheduled: 16, completed: 4, sales: 11 },
  { date: '8 de abr. de 2025', scheduled: 19, completed: 6, sales: 3 },
  { date: '9 de abr. de 2025', scheduled: 23, completed: 15, sales: 3 },
  { date: '10 de abr. de 2025', scheduled: 26, completed: 12, sales: 1 },
  { date: '12 de abr. de 2025', scheduled: 7, completed: 0, sales: 0 },
  { date: '14 de abr. de 2025', scheduled: 30, completed: 0, sales: 0 }
];

// Colors for pie charts
const COLORS = ['#F5A623', '#F0B355', '#E6C17E', '#D6C59A', '#CDCBB0', '#B2B7C5', '#8F97AA', '#6B768F', '#485574', '#36435E'];

export default function ComercialDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard Comercial</h1>
        <div className="text-sm text-gray-400">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>
      
      {/* Stats rows - First and second rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Calls Agendadas"
          value={isLoading ? "Carregando..." : String(mockCalls.scheduled)}
          icon={<Calendar />}
          change={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Calls Realizadas"
          value={isLoading ? "Carregando..." : String(mockCalls.completed)}
          icon={<PhoneCall />}
          change={{ value: 3.8, isPositive: true }}
        />
        <StatCard
          title="No-Shows"
          value={isLoading ? "Carregando..." : `${mockCalls.noShows} (${mockCalls.noShowRate}%)`}
          icon={<AlertTriangle />}
          change={{ value: 2.1, isPositive: false }}
        />
      </div>
      
      {/* Stats row - Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Taxa de Vendas"
          value={isLoading ? "Carregando..." : `${mockSales.conversionRate}%`}
          icon={<Users />}
          change={{ value: 4.5, isPositive: true }}
        />
        <StatCard
          title="Vendas Realizadas"
          value={isLoading ? "Carregando..." : String(mockSales.completed)}
          icon={<Calendar />}
          change={{ value: 7.2, isPositive: true }}
        />
        <StatCard
          title="Ticket Médio"
          value={isLoading ? "Carregando..." : mockSales.averageTicket}
          icon={<PhoneCall />}
          change={{ value: 6.8, isPositive: true }}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Closer Performance Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-gradient border border-hta-gray-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <span className="text-hta-highlight mr-2">📊</span>
                  Call Agendada por Closer
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-hta-dark-card-hover text-gray-400">
                        <TableHead className="w-[180px]">Closer</TableHead>
                        <TableHead className="text-right">Calls</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!isLoading && mockClosers.map((closer) => (
                        <TableRow key={closer.name} className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover">
                          <TableCell className="font-medium">{closer.name}</TableCell>
                          <TableCell className="text-right">{closer.scheduledCalls}</TableCell>
                        </TableRow>
                      ))}
                      {isLoading && Array(5).fill(0).map((_, i) => (
                        <TableRow key={i} className="border-t border-hta-gray-dark">
                          <TableCell className="font-medium">Carregando...</TableCell>
                          <TableCell className="text-right">--</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient border border-hta-gray-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <span className="text-hta-highlight mr-2">📞</span>
                  Call Realizada por Closer
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-hta-dark-card-hover text-gray-400">
                        <TableHead className="w-[180px]">Closer</TableHead>
                        <TableHead className="text-right">Calls</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!isLoading && mockClosers.map((closer) => (
                        <TableRow key={closer.name} className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover">
                          <TableCell className="font-medium">{closer.name}</TableCell>
                          <TableCell className="text-right">{closer.completedCalls}</TableCell>
                        </TableRow>
                      ))}
                      {isLoading && Array(5).fill(0).map((_, i) => (
                        <TableRow key={i} className="border-t border-hta-gray-dark">
                          <TableCell className="font-medium">Carregando...</TableCell>
                          <TableCell className="text-right">--</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NoShow Table */}
          <Card className="card-gradient border border-hta-gray-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="text-hta-highlight mr-2">⚠️</span>
                NoShow por Closer
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-hta-dark-card-hover text-gray-400">
                      <TableHead className="w-[180px]">Closer</TableHead>
                      <TableHead className="text-right">NoShow</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!isLoading && mockClosers.map((closer) => (
                      <TableRow key={closer.name} className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover">
                        <TableCell className="font-medium">{closer.name}</TableCell>
                        <TableCell className="text-right">{closer.noShowRate}</TableCell>
                      </TableRow>
                    ))}
                    {isLoading && Array(5).fill(0).map((_, i) => (
                      <TableRow key={i} className="border-t border-hta-gray-dark">
                        <TableCell className="font-medium">Carregando...</TableCell>
                        <TableCell className="text-right">--</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Calls Bar Chart - Fixed width to fill space */}
          <Card className="card-gradient border border-hta-gray-dark">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="text-hta-highlight mr-2">📅</span>
                Call Agendada por Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={mockDailyCallsData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="date"
                        stroke="#999" 
                        tick={{ fill: '#999' }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis stroke="#999" tick={{ fill: '#999' }} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-hta-dark-card border border-hta-gray-dark p-3 rounded-lg">
                                <p className="text-sm text-gray-400">{`${payload[0].payload.date}`}</p>
                                <p className="text-sm text-white">{`Calls: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="scheduled" name="Calls" fill="#F5A623" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-400">Carregando dados do gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Call Completion by Day - Fixed width to fill space */}
          <Card className="card-gradient border border-hta-gray-dark">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="text-hta-highlight mr-2">📆</span>
                Call Realizadas por Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={mockDailyCallsData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="date"
                        stroke="#999" 
                        tick={{ fill: '#999' }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis stroke="#999" tick={{ fill: '#999' }} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-hta-dark-card border border-hta-gray-dark p-3 rounded-lg">
                                <p className="text-sm text-gray-400">{`${payload[0].payload.date}`}</p>
                                <p className="text-sm text-white">{`Realizadas: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="completed" name="Realizadas" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-400">Carregando dados do gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Conversion Rate Progress */}
          <Card className="card-gradient border border-hta-gray-dark overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Realizadas vs. Agendadas</span>
                  <span className="font-bold">{mockCalls.completionRate}%</span>
                </div>
                <div className="h-2 bg-hta-gray-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-hta-highlight" 
                    style={{ width: `${mockCalls.completionRate}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm text-gray-400">Performance</span>
                  <span className="font-bold">{mockSales.performance}%</span>
                </div>
                <div className="h-2 bg-hta-gray-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${mockSales.performance}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Distribuição por Profissão - Fixed vertical chart alignment */}
          <Card className="card-gradient border border-hta-gray-dark">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="text-hta-highlight mr-2">👤</span>
                Distribuição por Profissão
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="flex justify-center w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={mockProfessionData}
                      margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#999" tick={{ fill: '#999' }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={80} 
                        stroke="#999" 
                        tick={{ fill: '#999' }}
                        tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-hta-dark-card border border-hta-gray-dark p-3 rounded-lg">
                                <p className="text-sm text-white">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="value" fill="#F5A623" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-400">Carregando dados do gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Renda Mensal dos Leads - Fixed pie chart alignment */}
          <Card className="card-gradient border border-hta-gray-dark">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="text-hta-highlight mr-2">💰</span>
                Renda Mensal dos Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="flex justify-center items-center w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Pie
                        data={mockRevenueData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={60}
                        outerRadius={90} 
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-hta-dark-card border border-hta-gray-dark p-3 rounded-lg">
                                <p className="text-sm text-white">{`${payload[0].name}: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-400">Carregando dados do gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Daily Sales - Bar Chart */}
          <Card className="card-gradient border border-hta-gray-dark">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="text-hta-highlight mr-2">💼</span>
                Vendas Realizadas por Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={mockDailyCallsData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="date"
                        stroke="#999" 
                        tick={{ fill: '#999' }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis stroke="#999" tick={{ fill: '#999' }} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-hta-dark-card border border-hta-gray-dark p-3 rounded-lg">
                                <p className="text-sm text-gray-400">{`${payload[0].payload.date}`}</p>
                                <p className="text-sm text-white">{`Vendas: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="sales" name="Vendas" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[250px] flex items-center justify-center">
                  <p className="text-gray-400">Carregando dados do gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
