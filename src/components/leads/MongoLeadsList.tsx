
import { useState } from "react";
import { useLeads } from "@/hooks/useMongoData";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function MongoLeadsList() {
  const [searchId, setSearchId] = useState<string>("");
  const [page, setPage] = useState(0);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const limit = 10;
  const { leads, loading, error } = useLeads(limit, page * limit);
  const { toast } = useToast();

  const handleNextPage = () => {
    if (!isFiltering) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (!isFiltering) {
      setPage(prev => Math.max(0, prev - 1));
    }
  };

  const handleSearch = () => {
    if (!searchId.trim()) {
      setIsFiltering(false);
      return;
    }

    const id = parseInt(searchId);
    if (isNaN(id)) {
      toast({
        title: "ID inválido",
        description: "Por favor, insira um ID numérico válido",
        variant: "destructive",
      });
      return;
    }

    const found = leads.filter(lead => lead.id === id);
    
    if (found.length === 0) {
      toast({
        title: "Lead não encontrado",
        description: `Nenhum lead com ID ${id} foi encontrado`,
        variant: "destructive",
      });
    }

    setFilteredLeads(found);
    setIsFiltering(true);
  };

  const clearSearch = () => {
    setSearchId("");
    setIsFiltering(false);
  };

  const displayLeads = isFiltering ? filteredLeads : leads;

  return (
    <Card className="bg-card border-hta-gray-dark mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Leads do MongoDB</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-[180px] pr-8 bg-hta-dark-card border-hta-gray-dark text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Search 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          {isFiltering && (
            <Button 
              variant="outline" 
              onClick={clearSearch} 
              size="sm"
              className="text-xs"
            >
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-10 text-center">Carregando leads...</div>
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
                    <TableHead className="py-3 px-4 text-right">Preço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayLeads.length > 0 ? (
                    displayLeads.map((lead) => (
                      <TableRow 
                        key={lead.id}
                        className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover transition-colors"
                      >
                        <TableCell className="py-3 px-4 font-medium">{lead.id}</TableCell>
                        <TableCell className="py-3 px-4">{lead.name}</TableCell>
                        <TableCell className="py-3 px-4">{lead.pipeline_id}</TableCell>
                        <TableCell className="py-3 px-4">{lead.status_id}</TableCell>
                        <TableCell className="py-3 px-4 text-right">
                          {lead.price ? `R$ ${lead.price.toFixed(2)}` : 'R$ 0,00'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        {isFiltering ? "Nenhum lead encontrado com este ID" : "Nenhum lead disponível"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {!isFiltering && (
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
                  disabled={displayLeads.length < limit}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
