export class CartItem {
    constructor(cartId: number,
                productId: number,
                quantity: number
                )
    {
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
    }

    id: number;
    cartId: number;
    productId: number;
    name: string;
    imgUrl: string;
    price: number;
    quantity: number;;
    itemTotal: number;
}