
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard, 
  TrendingUp, 
  Users,
  Settings
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
