export class CartItem {
    constructor(cartId: string,
                productId: string,
                quantity: number
                )
    {
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
    }

    key: string;
    cartId: string;
    productId: string;
    name: string;
    imgUrl: string;
    price: number;
    quantity: number;;
    total: number;
}