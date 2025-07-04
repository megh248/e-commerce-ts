import React, { useState } from "react";
import { Product } from "../../../../types/Product";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { addToCart } from "../../../Cart/_redux/cartSlice";
import type { CartItem } from "../../../../types/Cart";

// ProductsListItem shows a single product card with add-to-cart controls
const ProductsListItem: React.FC<{ product: Product }> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
        };
        dispatch(addToCart(cartItem));
    };

    return (
        <div className="col-md-4 mb-3 col-sm-12">
            <div className="card">
                <img src={product.imageUrl} height={300} alt={product.name} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">${product.price}</p>
                </div>
                <div className="card-footer d-flex align-items-center">
                    <div className="d-flex align-items-center me-3 quantity-container">
                        <button
                            disabled={quantity === 1}
                            className="quantity-button-minus"
                            aria-label="Decrease quantity"
                            title="Decrease quantity"
                            onClick={() => setQuantity(quantity - 1)}
                        >-</button>
                        <p className="mb-0 mx-2">{quantity}</p>
                        <button
                            className="quantity-button-plus"
                            aria-label="Increase quantity"
                            title="Increase quantity"
                            onClick={() => setQuantity(quantity + 1)}
                        >+</button>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                        aria-label={`Add ${quantity} ${product.name} to cart`}
                        title={`Add ${quantity} ${product.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsListItem;