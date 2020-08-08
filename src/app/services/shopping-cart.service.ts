import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { FlashMessageService } from './flash-message.service';
import { FlashMessageType } from '../enums/flash-message-types';
import { Subject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _shoppingCart: ShoppingCart;

  cartItemsCounter: number = 0;
  cartTotal: number = 0;

  cartTotalEmiter = new Subject<number>();
  cartItemsCounterEmiter = new Subject<number>();
  cartItemsEmiter = new Subject<CartItem[]>();

  constructor(private db: AngularFireDatabase,
              private flashMessageService: FlashMessageService,
              private productService: ProductService) { this.getOrCreateCart(); }

   shoppingCart() : ShoppingCart{
     return this._shoppingCart ?? { key: "", dateCreated: 0, items: [] }
   }           

   addToCart (product: Product, quantity: number): void 
  {
    let cartItem = this._shoppingCart.items.find(cartItem => cartItem.productId === product.key);
    if(!cartItem){ this.addNewCartItem(product); return; } 
    this.updateCartItemQuantity(product.key, quantity);

  }

  updateCartItemQuantity(productId: string, quantity: number): void 
  {
    this.updateCartItemQty(productId, quantity);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Cart item quantity changed.", FlashMessageType.success);
    this.updateCartItemsCounter();
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
    this.cartItemsEmiter.next(this._shoppingCart.items);
    this.calculateCartTotal();
   }

  private updateCartItemsCounter() : void 
  {
    this.cartItemsCounter = 0;

    this._shoppingCart.items.forEach(cartItem => {
      this.cartItemsCounter += cartItem.quantity
    });

    this.cartItemsCounterEmiter.next(this.cartItemsCounter);
  }

   private addNewCartItem(product: Product) : void 
   {
    this.insertNewCartItem(product);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Product added to cart.", FlashMessageType.success);
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
    this.cartItemsEmiter.next(this._shoppingCart.items);
    this.calculateCartTotal();
   }

  private insertNewCartItem(product: Product): void 
  {
    let cartItem = this.createNewCartObject(product);
    this._shoppingCart.items.push(cartItem);
    this.db.object('/shopping-carts/' + this._shoppingCart.key).update(this._shoppingCart);
  }

  private updateCartItemQty(productId: string, quantity: number): void 
  {
    let cartItem = this._shoppingCart.items.find(ci => ci.productId == productId);
    cartItem.quantity = cartItem.quantity + quantity;
    
    if(cartItem.quantity <= 0) this.removeCartItemFromCart(cartItem);

    this.db.object('/shopping-carts/' + this._shoppingCart.key).update(this._shoppingCart);
  }

  private removeCartItemFromCart(cartItem: CartItem) : void 
  {
    let index = this._shoppingCart.items.findIndex(item => item == cartItem);
    this._shoppingCart.items.splice(index, 1);
  }

  private async getOrCreateCart() : Promise<void> 
  {
    let cartId = localStorage.getItem('cartId');
    if(!cartId) cartId = await this.CreateNewShoppingCart();
    this.getCart(cartId);
  }

  private async CreateNewShoppingCart(): Promise<string> 
  {
    let result = this.createNewUserShoppingCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getCart(cartID : string) : void 
  {
    this.db.object('/shopping-carts/' + cartID)
            .snapshotChanges()
            .subscribe(cart => {
              let { key, payload } = cart;
              this._shoppingCart = payload.val() as ShoppingCart
              this._shoppingCart.key = key;

              if(!this._shoppingCart.items) this._shoppingCart.items = [];

              this._shoppingCart.items.forEach(item => this.fillProductDetails(item));
              this.updateCartItemsCounter();
              this.calculateCartTotal();
              this.cartItemsEmiter.next(this._shoppingCart.items);
            });
  }

  private createNewUserShoppingCart(): firebase.database.Reference
  {
    let shoppingCart: ShoppingCart = 
    {  
      dateCreated: new Date().getTime(),
      items: [] 
    };
    return this.db.list('/shopping-carts').push(shoppingCart);
  }

  private createNewCartObject(product: Product) : CartItem
  {
    let cartItem : CartItem = 
    {
      productId: product.key,
      quantity: 1,
      cartId: this._shoppingCart.key
    };

    return cartItem;
  }

  private fillProductDetails(cartItem: CartItem) : void
  {
    this.productService.get(cartItem.productId).subscribe(product =>{
      cartItem.name = product.title;
      cartItem.price = product.price;
      cartItem.imgUrl = product.imageUrl;
      cartItem.total = this.calculateCartItemTotal(product, cartItem.quantity);
    });
  }


  private calculateCartItemTotal(product: Product, qty: number) : number
  {
    return product.price * qty;
  }

  private calculateCartTotal()
  {
    this.cartTotal = this._shoppingCart.items.reduce((total, item) => {
      return total += item.total;
    }, 0);
    this.cartTotalEmiter.next(this.cartTotal);
  }
}