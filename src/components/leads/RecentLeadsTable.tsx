
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Types for our data
type Lead = {
  id: string;
  name: string;
  date: string;
  stage: {
    id: number;
    name: string;
  };
  profession: string;
  objective: string;
  seller: string;
  value: string;
};

export default function RecentLeadsTable() {
  const [stageFilter, setStageFilter] = useState<string>("all");
  
  // Sample data based on the image
  const leads: Lead[] = [
    {
      id: "1",
      name: "Lígia",
      date: "20/04/2023",
      stage: { id: 1, name: "COMPROU FELPUDO" },
      profession: "Desenvolvimento",
      objective: "Aumentar ativos",
      seller: "N/A",
      value: "N/A"
    },
    {
      id: "2",
      name: "Letícia",
      date: "30/04/2023",
      stage: { id: 3, name: "PREENCHEU FORMS" },
      profession: "Indicação de um amigo",
      objective: "N/A",
      seller: "Douglas Grimaldi",
      value: "R$ 20.000,00"
    },
    {
      id: "3",
      name: "Letícia",
      date: "25/04/2023",
      stage: { id: 3, name: "PREENCHEU FORMS" },
      profession: "Indicação de um amigo",
      objective: "N/A",
      seller: "Douglas Grimaldi",
      value: "R$ 20.000,00"
    },
    {
      id: "4",
      name: "Letícia",
      date: "30/04/2023",
      stage: { id: 3, name: "PREENCHEU FORMS" },
      profession: "Indicação de um amigo",
      objective: "N/A",
      seller: "Douglas Grimaldi",
      value: "R$ 20.000,00"
    },
    {
      id: "5",
      name: "Raquel",
      date: "30/04/2023",
      stage: { id: 4, name: "PRÉ QUALIFICADO" },
      profession: "Acredito que analisando meu perfil e entendendo...",
      objective: "Profissional",
      seller: "N/A",
      value: "N/A"
    },
    {
      id: "6",
      name: "DANIEL",
      date: "30/04/2023",
      stage: { id: 5, name: "QUALIFICADO" },
      profession: "médico ortopedista especialista em coluna",
      objective: "Desenvolver ações que...",
      seller: "N/A",
      value: "N/A"
    },
    {
      id: "7",
      name: "DANIEL",
      date: "30/04/2023",
      stage: { id: 5, name: "QUALIFICADO" },
      profession: "médico ortopedista especialista em coluna",
      objective: "Desenvolver ações que...",
      seller: "N/A",
      value: "N/A"
    }
  ];

  // Filter leads based on selected stage
  const filteredLeads = stageFilter === "all" 
    ? leads 
    : leads.filter(lead => lead.stage.id.toString() === stageFilter);

  const getBadgeColor = (stageId: number) => {
    if (stageId === 1) return "bg-amber-600 text-white";
    if (stageId === 8) return "bg-green-600 text-white";
    return "bg-amber-600/80 text-white";
  };

  return (
    <div className="rounded-lg card-gradient border border-hta-gray-dark overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold">Leads Recentes</h2>
          <p className="text-xs text-muted-foreground">Últimos leads registrados no sistema</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px] bg-hta-dark-card border-hta-gray-dark">
              <SelectValue placeholder="Todas etapas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas etapas</SelectItem>
              <SelectItem value="1">Etapa 1</SelectItem>
              <SelectItem value="2">Etapa 2</SelectItem>
              <SelectItem value="3">Etapa 3</SelectItem>
              <SelectItem value="4">Etapa 4</SelectItem>
              <SelectItem value="5">Etapa 5</SelectItem>
              <SelectItem value="6">Etapa 6</SelectItem>
              <SelectItem value="7">Etapa 7</SelectItem>
              <SelectItem value="8">Etapa 8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-hta-dark-card-hover text-gray-400 border-b border-hta-gray-dark">
              <TableHead className="py-3 px-4">Nome</TableHead>
              <TableHead className="py-3 px-4">Data</TableHead>
              <TableHead className="py-3 px-4">Etapa</TableHead>
              <TableHead className="py-3 px-4">Profissão</TableHead>
              <TableHead className="py-3 px-4">Objetivo</TableHead>
              <TableHead className="py-3 px-4">Vendedor</TableHead>
              <TableHead className="py-3 px-4 text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="border-t border-hta-gray-dark hover:bg-hta-dark-card-hover transition-colors"
              >
                <TableCell className="py-3 px-4 font-medium">{lead.name}</TableCell>
                <TableCell className="py-3 px-4">{lead.date}</TableCell>
                <TableCell className="py-3 px-4">
                  <span className={cn(
                    "inline-flex items-center justify-center w-6 h-6 rounded-sm text-xs font-medium mr-2",
                    getBadgeColor(lead.stage.id)
                  )}>
                    {lead.stage.id}
                  </span>
                  {lead.stage.name}
                </TableCell>
                <TableCell className="py-3 px-4 max-w-[200px] truncate">{lead.profession}</TableCell>
                <TableCell className="py-3 px-4 max-w-[200px] truncate">{lead.objective}</TableCell>
                <TableCell className="py-3 px-4">{lead.seller}</TableCell>
                <TableCell className="py-3 px-4 text-right">
                  {lead.value !== "N/A" ? (
                    <span className="font-medium text-hta-highlight">{lead.value}</span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
