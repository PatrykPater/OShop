import { CartItem } from './cart-item';

export interface ShoppingCart{
    key: string,
    dateCreated: number
    items: CartItem[]
}