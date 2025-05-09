
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard, 
  TrendingUp, 
  Users,
  Settings,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, isCollapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
        "hover:bg-hta-dark-card-hover",
        isActive ? "bg-hta-dark-card text-hta-highlight" : "text-gray-300",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // For desktop view
  if (!isMobile) {
    return (
      <aside className={cn(
        "flex flex-col h-screen bg-hta-dark-card border-r border-hta-gray-dark transition-all",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className={cn(
          "flex items-center py-4",
          collapsed ? "justify-center" : "px-4"
        )}>
          {!collapsed && (
            <h1 className="text-xl font-bold text-gradient-highlight">HTA</h1>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-hta-highlight to-hta-highlight/80 flex items-center justify-center text-black font-bold">
              H
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-md hover:bg-hta-dark-card-hover text-gray-400"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <div className="mt-6 flex flex-col gap-2 px-2">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard de Vendas" isCollapsed={collapsed} />
          <NavItem to="/comercial" icon={TrendingUp} label="Dashboard Comercial" isCollapsed={collapsed} />
          <NavItem to="/leads" icon={Users} label="Conversão de Leads" isCollapsed={collapsed} />
        </div>
        
        <div className="mt-auto mb-4 px-2">
          <NavItem to="/configuracoes" icon={Settings} label="Configurações" isCollapsed={collapsed} />
        </div>
      </aside>
    );
  }
  
  // For mobile view (header)
  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-hta-dark-card border-b border-hta-gray-dark z-30 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gradient-highlight">HTA</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-hta-dark-card-hover text-gray-300"
        >
          <Menu size={20} />
        </button>
      </header>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 z-50 h-full w-64 bg-hta-dark-card border-l border-hta-gray-dark transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-hta-gray-dark">
          <h1 className="text-xl font-bold text-gradient-highlight">Menu</h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md hover:bg-hta-dark-card-hover text-gray-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="mt-6 flex flex-col gap-2 px-3">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard de Vendas" isCollapsed={false} />
          <NavItem to="/comercial" icon={TrendingUp} label="Dashboard Comercial" isCollapsed={false} />
          <NavItem to="/leads" icon={Users} label="Conversão de Leads" isCollapsed={false} />
          <NavItem to="/configuracoes" icon={Settings} label="Configurações" isCollapsed={false} />
        </div>
      </div>
      
      {/* Spacer for mobile header */}
      <div className="h-[56px]" />
    </>
  );
}
