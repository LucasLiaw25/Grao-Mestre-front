// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar"; // Importe o Sidebar
import { Navbar } from "@/components/Navbar"; // Importe a Navbar para o header do dashboard
import { useAuth } from "@/hooks/use-auth"; // Para verificar autenticação, se necessário
import { Loader2 } from "lucide-react";

export function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth(); // Use o hook de autenticação

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar /> {/* O Sidebar fica fixo à esquerda */}
      <div className="flex-1 flex flex-col">
        {/* Header do Dashboard (opcional, pode ser uma Navbar simplificada ou apenas um título) */}
        <header className="w-full bg-card border-b border-border/50 h-20 flex items-center px-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-foreground">Admin Dashboard</h2>
          {/* Você pode adicionar elementos como um menu de usuário, notificações, etc. aqui */}
        </header>

        {/* Conteúdo principal do Dashboard */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet /> {/* Aqui as páginas de gerenciamento serão renderizadas */}
        </main>
      </div>
    </div>
  );
}