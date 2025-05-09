
import { cn } from '@/lib/utils';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatCurrency } from '@/services/salesService';

type Sale = {
  id: number;
  client: string;
  product: string;
  value: number;
  date: string;
  seller: string;
  pipeline: string;
};

type RecentSalesProps = {
  sales: Sale[];
  className?: string;
  isLoading?: boolean;
};

export default function RecentSales({ sales, className, isLoading = false }: RecentSalesProps) {
  return (
    <div className={cn("rounded-lg card-gradient border border-hta-gray-dark overflow-hidden", className)}>
      <div className="p-4 flex items-center">
        <span className="text-hta-highlight">🛒</span>
        <h2 className="text-lg font-bold ml-2">Últimas Vendas</h2>
        <span className="ml-2 text-xs text-gray-400">Vendas mais recentes</span>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-400">Carregando dados...</div>
        ) : sales.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-hta-dark-card-hover text-gray-400">
                <TableHead className="py-3 px-4">Cliente</TableHead>
                <TableHead className="py-3 px-4">Produto</TableHead>
                <TableHead className="py-3 px-4">Vendedor</TableHead>
                <TableHead className="py-3 px-4">Pipeline</TableHead>
                <TableHead className="py-3 px-4 text-right">Valor</TableHead>
                <TableHead className="py-3 px-4 text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow 
                  key={sale.id}
                  className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover transition-colors"
                >
                  <TableCell className="py-3 px-4 font-medium">{sale.client}</TableCell>
                  <TableCell className="py-3 px-4">{sale.product}</TableCell>
                  <TableCell className="py-3 px-4">{sale.seller}</TableCell>
                  <TableCell className="py-3 px-4">{sale.pipeline}</TableCell>
                  <TableCell className="py-3 px-4 text-right font-medium text-hta-highlight">
                    {formatCurrency(sale.value)}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right text-gray-400">
                    {new Date(sale.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-4 text-center text-gray-400">Nenhuma venda recente encontrada.</div>
        )}
      </div>
    </div>
  );
}
