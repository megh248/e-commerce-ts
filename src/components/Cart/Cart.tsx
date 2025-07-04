import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import type { AppDispatch } from "../../store";
import { removeFromCart, clearCart, updateQuantity } from "./_redux/cartSlice";
import type { CartItem } from "../../types/Cart";

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart);

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ id, quantity }));
    };

    if (!cart.cartItems.length) {
        return <div className="container-fluid mt-4"><h2>Cart</h2><p>Your shopping cart is empty.</p></div>;
    }

    return (
        <div className="container-fluid mt-4">
            <h2>Cart</h2>
            <button className="btn btn-danger mb-3" onClick={handleClear}>Clear Cart</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.cartItems.map((item: CartItem) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>
                                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3">
                <strong>Total Quantity:</strong> {cart.totalQuantity} <br />
                <strong>Total Amount:</strong> ${cart.totalAmount}
            </div>
        </div>
    );
};

export default Cart;