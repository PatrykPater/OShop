import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { Observable } from 'rxjs';
import { Key } from 'protractor';
import { FlashMessageService } from './flash-message.service';
import { FlashMessageType } from '../enums/flash-message-types';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: ShoppingCart;

  constructor(private db: AngularFireDatabase,
              private flashMessageService: FlashMessageService) { this.initCart(); }

   addToCart (product: Product): void{
    let cartItem = this.shoppingCart.items.find(cartItem => cartItem.productId === product.key);
    if(!cartItem){
      this.addNewCartItem(product);
      this.flashMessageService.showMessage("Product added to Cart", FlashMessageType.success);
      return;
    } 
    debugger; 
    this.updateCartItemQty(cartItem);
    this.flashMessageService.showMessage("Product quantity changed", FlashMessageType.success);
  }

  private initCart(): void{
    this.getOrCreateCart();
   }

  private addNewCartItem(product: Product): void{
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
            .pipe(
              map(cartDb => cartDb))
            .subscribe(cart => {
              this.shoppingCart = cart.payload.val() as ShoppingCart
              this.shoppingCart.key = cart.payload.key;
              if(!this.shoppingCart.items) this.shoppingCart.items = [];
            });
  }
}