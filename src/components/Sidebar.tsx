// src/components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User, Tag, Coffee, LayoutDashboard, ShoppingBag, Home, Package } from "lucide-react"; // Adicionei alguns ícones úteis

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
    },
    {
      to: "/dashboard/user-management",
      label: "Users",
      icon: User,
    },
    {
      to: "/dashboard/category-management",
      label: "Categories",
      icon: Tag,
    },
    {
      to: "/dashboard/product-management",
      label: "Products",
      icon: Coffee,
    },
    {
      to: "/dashboard/order-management", // Exemplo para futuras páginas
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      to: "/dashboard/stock-management", // Exemplo para futuras páginas
      label: "Stock",
      icon: Package,
    },
  ];

  return (
    <aside
      className={cn(
        "w-64 bg-card border-r border-border/50 p-6 flex flex-col",
        className
      )}
    >
      <div className="mb-10">
        <Link to="/" className="flex-shrink-0 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Grão Mestre.
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pode adicionar um footer ou informações de usuário aqui no sidebar */}
      <div className="mt-auto pt-6 border-t border-border/50 text-sm text-muted-foreground">
        <p>Admin Panel</p>
        <p className="text-xs">© {new Date().getFullYear()} Grão Mestre.</p>
      </div>
    </aside>
  );
}