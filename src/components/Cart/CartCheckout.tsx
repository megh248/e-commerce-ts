import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const paymentModes = [
  "Credit Card",
  "Debit Card",
  "UPI",
  "Cash on Delivery"
];

const CartCheckout = () => {
  const cart = useSelector((state: RootState) => state.cart);

  console.log(cart);

  // Address fields
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMode, setPaymentMode] = useState(paymentModes[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle order placement logic
    // For now, just show a confirmation
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <div className="mb-3">
        <strong>Number of Items:</strong> {cart.totalQuantity} <br />
        <strong>Total Amount:</strong> ${cart.totalAmount}
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <h4>Shipping Address</h4>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Address Line 1"
            value={address1}
            onChange={e => setAddress1(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Address Line 2 (optional)"
            value={address2}
            onChange={e => setAddress2(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="State"
            value={state}
            onChange={e => setState(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Zip Code"
            value={zip}
            onChange={e => setZip(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
        </div>
        <h4 className="mt-4">Payment Mode</h4>
        <div className="mb-3">
          <select
            className="form-select"
            value={paymentMode}
            onChange={e => setPaymentMode(e.target.value)}
            required
          >
            {paymentModes.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Place Order</button>
      </form>
      {submitted && (
        <div className="alert alert-success mt-3">
          Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default CartCheckout;