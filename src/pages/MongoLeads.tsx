
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useLeads } from "../hooks/useMongoData";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MongoLeads() {
  const [page, setPage] = useState(0);
  const limit = 10;
  const { leads, loading, error } = useLeads(limit, page * limit);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(0, prev - 1));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="mb-2">
          <h1 className="text-2xl md:text-3xl font-bold">Leads do MongoDB</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visualização dos leads armazenados na coleção MongoDB
          </p>
        </div>
        
        <Card className="bg-card border-hta-gray-dark">
          <CardHeader>
            <CardTitle>Leads do MongoDB</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-10 text-center">Carregando dados do MongoDB...</div>
            ) : error ? (
              <div className="py-10 text-center text-red-500">
                Erro ao carregar dados: {error.message}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-hta-dark-card-hover text-gray-400 border-b border-hta-gray-dark">
                        <TableHead className="py-3 px-4">ID</TableHead>
                        <TableHead className="py-3 px-4">Nome</TableHead>
                        <TableHead className="py-3 px-4">Pipeline ID</TableHead>
                        <TableHead className="py-3 px-4">Status ID</TableHead>
                        <TableHead className="py-3 px-4">Criado em</TableHead>
                        <TableHead className="py-3 px-4">Preço</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.length > 0 ? (
                        leads.map((lead) => (
                          <TableRow 
                            key={lead.id}
                            className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover transition-colors"
                          >
                            <TableCell className="py-3 px-4 font-medium">{lead.id}</TableCell>
                            <TableCell className="py-3 px-4">{lead.name}</TableCell>
                            <TableCell className="py-3 px-4">{lead.pipeline_id}</TableCell>
                            <TableCell className="py-3 px-4">{lead.status_id}</TableCell>
                            <TableCell className="py-3 px-4">
                              {new Date(lead.created_at * 1000).toLocaleString('pt-BR')}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-right">
                              {lead.price ? `R$ ${lead.price.toFixed(2)}` : 'R$ 0,00'}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10">
                            Nenhum lead encontrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevPage} 
                    disabled={page === 0}
                  >
                    Anterior
                  </Button>
                  <span className="py-2">Página {page + 1}</span>
                  <Button 
                    variant="outline" 
                    onClick={handleNextPage} 
                    disabled={leads.length < limit}
                  >
                    Próxima
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
