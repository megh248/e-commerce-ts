import React from "react";
import {Product} from "../../../../types/Product";

const ProductsListItem: React.FC<{product: Product}> =({product}) => {
    return (
        <div className="col-md-4">
            <div className="card">
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">${product.price}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsListItem;