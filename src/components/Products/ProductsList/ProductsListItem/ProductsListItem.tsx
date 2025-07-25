import React, { useState } from "react";
import { Product } from "../../../../types/Product";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { addToCart } from "../../../Cart/_redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../_redux/productSlice";
import type { CartItem } from "../../../../types/Cart";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

// ProductsListItem shows a single product card with add-to-cart controls
const ProductsListItem: React.FC<{ product: Product }> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state: any) => state.product.wishlist);
    const isWishlisted = wishlist.some((item: Product) => item.id === product.id);

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
        };
        dispatch(addToCart(cartItem));
    };

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    return (
        <div className="col-md-4 mb-3 col-sm-12">
            <div className="card">
                <div className="product-image-container">
                    <Heart
                        className={`product-heart-icon mx-2${isWishlisted ? ' text-danger' : ''}`}
                        onClick={handleWishlistToggle}
                        style={{ cursor: 'pointer' }}
                        fill={isWishlisted ? 'red' : 'none'}
                    />
                </div>
                <Link to={`/products/${product.id}`} className="product-link">
                    <ProductCard product={product} />
                </Link>
                <div className="card-footer d-flex align-items-center">
                    <div className="d-flex align-items-center me-2 quantity-container">
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