import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ordersApi } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { Footer } from "@/components/Footer";
import { Package, Clock } from "lucide-react";
import type { OrderResponseDTO } from "@/types";

export default function Orders() {
  const { data: orders, isLoading } = useQuery<OrderResponseDTO[]>({
    queryKey: ["orders", "my"],
    queryFn: async () => (await ordersApi.getMyOrderHistory()).data,
  });

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    PAID: "bg-green-100 text-green-800",
    COMPLETED: "bg-green-100 text-green-800",
    SENDED: "bg-indigo-100 text-indigo-800",
    CANCELED: "bg-red-100 text-red-800",
    RECUSE: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-28 pb-12 bg-muted/30 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label">My Account</span>
            <h1 className="section-title">Order History</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))
          ) : orders && orders.length > 0 ? (
            orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.orderStatus] || "bg-muted text-muted-foreground"}`}>
                      {order.orderStatus}
                    </span>
                    <span className="text-lg font-bold text-foreground">{formatCurrency(order.totalPrice)}</span>
                  </div>
                </div>
                <div className="border-t border-border/50 pt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.productName} × {item.quantity}</span>
                      <span className="text-muted-foreground">{formatCurrency(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
              <p className="text-xl text-muted-foreground font-serif">No orders yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
