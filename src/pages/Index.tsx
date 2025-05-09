
import DashboardLayout from "../components/layout/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Sistema</h1>
        <p className="text-lg">
          Utilize o menu lateral para navegar entre as funcionalidades disponíveis.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Index;
