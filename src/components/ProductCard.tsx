import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ProductResponseDTO } from "@/types";
import { formatCurrency } from "@/lib/format";

interface ProductCardProps {
  product: ProductResponseDTO;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-5">
          {product.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 bg-background/90 backdrop-blur-md text-xs font-semibold text-foreground uppercase tracking-wider rounded-full">
                {product.category.name}
              </span>
            </div>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <p className="text-lg font-semibold text-primary">{formatCurrency(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
