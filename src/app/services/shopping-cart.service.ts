import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
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
  cartItemsEmiter = new Subject<CartItem[]>();

  constructor(private db: AngularFireDatabase,
              private flashMessageService: FlashMessageService) { this.getOrCreateCart(); }

   addToCart (product: Product, quantity: number): void{
    let cartItem = this.shoppingCart.items.find(cartItem => cartItem.productId === product.key);
    if(!cartItem){
      this.addNewCartItem(product);
      return;
    } 
    this.updateCartItemQuantity(product.key, quantity);
  }

  updateCartItemQuantity(productId: string, quantity: number): void{
    this.updateCartItemQty(productId, quantity);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Cart item quantity changed.", FlashMessageType.success);
    this.updateCartItemsCounter();
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
    this.cartItemsEmiter.next(this.shoppingCart.items);
   }

  private updateCartItemsCounter(){
    this.cartItemsCounter = 0;

    this.shoppingCart.items.forEach(cartItem => {
      this.cartItemsCounter += cartItem.quantity
    });

    this.cartItemsCounterEmiter.next(this.cartItemsCounter);
  }

   private addNewCartItem(product: Product) : void{
    this.insertNewCartItem(product);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Product added to cart.", FlashMessageType.success);
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
    this.cartItemsEmiter.next(this.shoppingCart.items);
   }

  private insertNewCartItem(product: Product): void{
    let cartItem = this.createNewCartObject(product);
    this.shoppingCart.items.push(cartItem);
    this.db.object('/shopping-carts/' + this.shoppingCart.key).update(this.shoppingCart);
  }

  private updateCartItemQty(productId: string, quantity: number): void{
    let cartItem = this.shoppingCart.items.find(ci => ci.productId == productId);
    cartItem.quantity = cartItem.quantity + quantity;
    
    if(cartItem.quantity <= 0) this.removeCartItemFromCart(cartItem);

    this.db.object('/shopping-carts/' + this.shoppingCart.key).update(this.shoppingCart);
  }

  private removeCartItemFromCart(cartItem: CartItem){
    let index = this.shoppingCart.items.findIndex(item => item == cartItem);
    this.shoppingCart.items.splice(index, 1);
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
              this.updateCartItemsCounter();
              this.cartItemsEmiter.next(this.shoppingCart.items);
            });
  }

  private createNewCartObject(product: Product){
    let cartItem : CartItem = {
      productId: product.key,
      quantity: 1,
      cartId: this.shoppingCart.key,
      name: product.title,
      price: product.price,
      imgUrl: product.imageUrl
    };

    return cartItem;
  }

  private calculateCartItemTotal(product: Product, qty: number) : number{
    return product.price * qty;
  }
  
}