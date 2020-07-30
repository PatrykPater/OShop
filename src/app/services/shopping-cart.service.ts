import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { FlashMessageService } from './flash-message.service';
import { FlashMessageType } from '../enums/flash-message-types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: ShoppingCart;
  cartItemsCounter: number = 0;
  cartItemsCounterEmiter = new Subject<number>();

  constructor(private db: AngularFireDatabase,
              private flashMessageService: FlashMessageService) { this.initCart(); }

   addToCart (product: Product): void{
    let cartItem = this.shoppingCart.items.find(cartItem => cartItem.productId === product.key);
    if(!cartItem){
      this.addNewCartItem(product);
      return;
    } 
    this.updateCartItem(cartItem);
  }

  private setCartItemsCounter(){
    this.cartItemsCounter = 0;
    this.shoppingCart.items.forEach(cartItem => {
      this.cartItemsCounter += cartItem.quantity
    });

    this.cartItemsCounterEmiter.next(this.cartItemsCounter);
  }

  private initCart(): void{
    this.getOrCreateCart();
   }

   private updateCartItem(cartItem : CartItem): void{
    this.updateCartItemQty(cartItem);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Cart item quantity changed.", FlashMessageType.success);
    this.setCartItemsCounter();
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
   }

   private addNewCartItem(product: Product) : void{
    this.insertNewCartItem(product);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Product added to cart.", FlashMessageType.success);
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
   }

  private insertNewCartItem(product: Product): void{
    let cartItem: CartItem = {
      productId: product.key,
      quantity: 1,
      cartId: this.shoppingCart.key 
    };

    this.shoppingCart.items.push(cartItem);
    this.db.object('/shopping-carts/' + this.shoppingCart.key).update(this.shoppingCart);
  }

  private updateCartItemQty(cartItem: CartItem): void{
    cartItem.quantity = cartItem.quantity + 1;
    this.db.object('/shopping-carts/' + this.shoppingCart.key).update(this.shoppingCart);
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    if(!cartId) cartId = await this.CreateNewShoppingCart();
    this.getCart(cartId);
  }

  private async CreateNewShoppingCart(): Promise<string>{
    let result = this.createNewUserShoppingCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private createNewUserShoppingCart(): firebase.database.Reference{
    let shoppingCart: ShoppingCart = {  
      dateCreated: new Date().getTime(),
      items: [] 
    };
    return this.db.list('/shopping-carts').push(shoppingCart);
  }

  private getCart(cartID : string) : void {
    this.db.object('/shopping-carts/' + cartID)
            .snapshotChanges()
            .subscribe(cart => {
              this.shoppingCart = cart.payload.val() as ShoppingCart
              this.shoppingCart.key = cart.payload.key;
              if(!this.shoppingCart.items) this.shoppingCart.items = [];
              this.setCartItemsCounter();
            });
  }
}