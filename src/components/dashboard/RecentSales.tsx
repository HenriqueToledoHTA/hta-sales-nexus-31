
import { cn } from '@/lib/utils';

type Sale = {
  id: number;
  client: string;
  product: string;
  value: number;
  date: string;
};

type RecentSalesProps = {
  sales: Sale[];
  className?: string;
};

export default function RecentSales({ sales, className }: RecentSalesProps) {
  return (
    <div className={cn("rounded-lg card-gradient border border-hta-gray-dark overflow-hidden", className)}>
      <div className="p-4 flex items-center">
        <span className="text-hta-highlight">🛒</span>
        <h2 className="text-lg font-bold ml-2">Últimas Vendas</h2>
        <span className="ml-2 text-xs text-gray-400">Vendas mais recentes</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-hta-dark-card-hover text-gray-400">
              <th className="py-3 px-4 text-left">Cliente</th>
              <th className="py-3 px-4 text-left">Produto</th>
              <th className="py-3 px-4 text-right">Valor</th>
              <th className="py-3 px-4 text-right">Data</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr 
                key={sale.id}
                className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover transition-colors"
              >
                <td className="py-3 px-4 font-medium">{sale.client}</td>
                <td className="py-3 px-4">{sale.product}</td>
                <td className="py-3 px-4 text-right font-medium text-hta-highlight">
                  R$ {sale.value.toLocaleString('pt-BR')}
                </td>
                <td className="py-3 px-4 text-right text-gray-400">
                  {new Date(sale.date).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
