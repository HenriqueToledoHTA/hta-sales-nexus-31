
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-6xl font-bold text-hta-highlight mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Página não encontrada</p>
        <Link to="/" className="bg-hta-highlight text-black px-4 py-2 rounded-md hover:bg-hta-highlight-hover transition-colors">
          Voltar ao Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
