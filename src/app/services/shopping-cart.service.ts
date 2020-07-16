import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: ShoppingCart;

  constructor(private db: AngularFireDatabase) {
    this.getOrCreateCart().then(promise => promise.valueChanges()
                          .pipe(map(dbObject => dbObject = this.shoppingCart)));
   }

  async addToCart (product: Product){
    let cartItem = this.shoppingCart.items.find(cartItem => cartItem.productId === product.key);
    if(!cartItem) this.addNewCartItem(product); 
    this.updateCartItem(cartItem);
  }

  private async getOrCreateCart(): Promise<AngularFireObject<ShoppingCart>>{
    debugger;
    let cartId = localStorage.getItem('cartId');
    if(!cartId) cartId = await this.getCartId();
    let testcart = this.getCart(cartId);
    return testcart;
  }

  private getCart(cartID: string): AngularFireObject<ShoppingCart>{
    return this.db.object('/shopping-carts/' + cartID)
  }

  private async getCartId(): Promise<string>{
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private create(): firebase.database.Reference{
    let shoppingCart: ShoppingCart;
    shoppingCart.dateCreated = new Date().getTime();
    return this.db.list('/shopping-carts').push(shoppingCart);
  }

  updateCartItem(cartItem: CartItem): void{
    cartItem.quantity = cartItem.quantity + 1;
  }

  addNewCartItem(product: Product): void{
    let cartItem: CartItem;
    cartItem.productId = product.key;
    cartItem.quantity = 1;

    this.shoppingCart.items.push(cartItem);
    this.db.object('/shopping-carts/' + this.shoppingCart.key).update(this.shoppingCart);
  }

}