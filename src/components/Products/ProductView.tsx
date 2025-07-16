import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { Product } from '../../types/Product';
import './products.scss';

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.product.products.find((p: Product) => p.id === id)
  );

  if (!product) {
    return (
      <div className="container-fluid mt-4">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products" className="btn btn-secondary">Back to Products</Link>
      </div>
    );
  }

  return (
    <section id="product-view">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={product.imageUrl} alt={product.name} className="img-fluid product-view-image" />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p className="product-view-description">{product.description}</p>
            <h4 className="product-view-price">${product.price}</h4>
            <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductView; 