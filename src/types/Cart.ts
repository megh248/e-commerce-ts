interface CartItem {
    id: string,
    name: string,
    price: number,
    quantity: number
}

interface Cart {
    cartItems: CartItem[],
    totalAmount: number,
    totalQuantity: number
}

export type {CartItem};
export type { Cart };