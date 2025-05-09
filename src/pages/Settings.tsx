
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>
      
      <div className="flex items-center justify-center h-[70vh] card-gradient rounded-lg border border-hta-gray-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Em Desenvolvimento</h2>
          <p className="text-gray-400">Esta página será implementada em breve.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
