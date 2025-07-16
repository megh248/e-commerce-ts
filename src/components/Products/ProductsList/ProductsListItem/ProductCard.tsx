import React from 'react';
import { Product } from '../../../../types/Product';

interface ProductCardProps {
  product: Product;
  imageClassName?: string;
  children?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, imageClassName = '', children }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} className={`card-img-top ${imageClassName}`} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>
        {children}
      </div>
    </div>
  );
};

export default ProductCard; 