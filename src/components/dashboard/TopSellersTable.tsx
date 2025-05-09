
import { cn } from '@/lib/utils';

type Seller = {
  id: number;
  name: string;
  sales: number;
  value: number;
};

type TopSellersTableProps = {
  sellers: Seller[];
  className?: string;
};

export default function TopSellersTable({ sellers, className }: TopSellersTableProps) {
  return (
    <div className={cn("rounded-lg card-gradient border border-hta-gray-dark overflow-hidden", className)}>
      <div className="p-4 flex items-center">
        <span className="text-hta-highlight">🏆</span>
        <h2 className="text-lg font-bold ml-2">Top Vendedores</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-hta-dark-card-hover text-gray-400">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Vendedor</th>
              <th className="py-3 px-4 text-center">Vendas</th>
              <th className="py-3 px-4 text-right">Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr 
                key={seller.id} 
                className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover transition-colors"
              >
                <td className="py-3 px-4">
                  {seller.id === 1 ? (
                    <span className="inline-block w-6 h-6 rounded-full bg-hta-highlight text-black font-bold flex items-center justify-center">
                      1
                    </span>
                  ) : (
                    seller.id
                  )}
                </td>
                <td className="py-3 px-4 font-medium">{seller.name}</td>
                <td className="py-3 px-4 text-center">{seller.sales}</td>
                <td className="py-3 px-4 text-right font-medium text-hta-highlight">
                  R$ {seller.value.toLocaleString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
