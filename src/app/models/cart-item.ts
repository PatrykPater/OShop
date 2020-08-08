export interface CartItem {
    key?: string,
    cartId: string;
    productId: string;
    name?: string,
    imgUrl?: string,
    price?: number,
    total?: number,
    quantity: number;
}