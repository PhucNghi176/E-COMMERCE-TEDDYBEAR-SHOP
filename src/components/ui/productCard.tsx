import React, { useState } from 'react';
import './ProductCard.css';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.imgUrl?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.color?.[0] || '');

  const handleProductClick = () => {
    onProductClick?.(product);
  };

  const isLowStock = product.quantity <= 5;
  const isOutOfStock = product.quantity === 0;

  return (
    <div
      className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`}
      role="article"
      aria-labelledby={`product-${product.id}-name`}
    >
      <div className="product-card__image-container">
        <img
          src={selectedImage}
          alt={`${product.name} teddy bear in ${selectedColor}`}
          className="product-card__image"
          onClick={handleProductClick}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-teddy.jpg';
          }}
        />

        {isOutOfStock && (
          <div className="product-card__overlay" aria-hidden="true">
            <span className="out-of-stock-label">Out of Stock</span>
          </div>
        )}

        {Array.isArray(product.primaryImageUrl) && product.primaryImageUrl.length > 1 && (
          <div className="product-card__image-dots" role="group" aria-label="Product images">
            {product.primaryImageUrl.map((url: string, index: number) => (
              <button
                key={index}
                className={`image-dot ${selectedImage === url ? 'image-dot--active' : ''}`}
                onClick={() => setSelectedImage(url)}
                aria-label={`View image ${index + 1} of ${product.name}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-card__content">
        <h3
          id={`product-${product.id}-name`}
          className="product-card__name"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        <div className="product-card__details">
          <div className="product-card__size">
            <span className="detail-label">Size:</span>
            <span className="detail-value">{product.size}</span>
          </div>

          <div className="product-card__price">
            <span className="price-amount">${product.price.toFixed(2)}</span>
          </div>
        </div>

        {product.color && product.color.length > 0 && (
          <div className="product-card__colors">
            <span className="detail-label">Colors:</span>
            <div className="color-options" role="group" aria-label="Available colors">
              {product.color.map((color, index) => (
                <button
                  key={index}
                  className={`color-swatch ${selectedColor === color ? 'color-swatch--selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                  aria-pressed={selectedColor === color}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                >
                  <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="product-card__tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="product-tag">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="product-card__stock">
          {isOutOfStock ? (
            <span className="stock-status stock-status--out" role="alert">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="stock-status stock-status--low" role="alert">
              Only {product.quantity} left!
            </span>
          ) : (
            <span className="stock-status stock-status--available">
              In Stock ({product.quantity} available)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
