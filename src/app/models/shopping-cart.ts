import { CartItem } from './cart-item';

export class ShoppingCart {

    constructor(dateCreated: number)
    {
        this.dateCreated = dateCreated;
    }

    id: number;
    dateCreated: number;
    cartItems: CartItem[];
}