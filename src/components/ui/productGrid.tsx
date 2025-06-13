import React from 'react';
import './ProductGrid.css';
import { Product } from '@/hooks/useProducts';
import ProductCard from './productCard';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductClick, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="product-grid" role="region" aria-label="Loading products">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="product-card product-card--skeleton">
            <div className="skeleton skeleton--image"></div>
            <div className="skeleton skeleton--text"></div>
            <div className="skeleton skeleton--text skeleton--short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid product-grid--empty" role="region" aria-label="No products">
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">🧸</div>
          <h2>No teddy bears found</h2>
          <p>Try adjusting your search or browse our full collection.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="product-grid" 
      role="region" 
      aria-label={`${products.length} products found`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
