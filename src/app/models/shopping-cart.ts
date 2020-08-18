import { CartItem } from './cart-item';

export class ShoppingCart {

    constructor(dateCreated: number)
    {
        this.dateCreated = dateCreated;
    }

    key: string;
    dateCreated: number;
    items: CartItem[];
}