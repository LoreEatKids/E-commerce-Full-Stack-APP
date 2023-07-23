export type cartItem = {
    id: string,
    name: string,
    desc?: string,
    price: number,
    quantity: number,
}

export type cartType = {
    totalQuantities: number,
    totalPrice: number | string,
    cartItems: cartItem[],
}