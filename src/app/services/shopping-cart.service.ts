import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { FlashMessageService } from './flash-message.service';
import { FlashMessageType } from '../enums/flash-message-types';
import { Subject, Subscription, Observable } from 'rxjs';
import { map, flatMap, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private Url = {  ShoppingCart: 'https://localhost:44322/ShoppingCarts' }
  private localStorageKeys = { shoppingCartID: 'OShop_ShoppingCart_ID' }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private shoppingCart: ShoppingCart;

  cartItemsCounter: number = 0;
  cartTotal: number = 0;

  cartTotalEmiter = new Subject<number>();
  cartItemsCounterEmiter = new Subject<number>();
  cartItemsEmiter = new Subject<CartItem[]>();

  constructor(private flashMessageService: FlashMessageService,
              private httpClient: HttpClient) { this.initShoppingCart(); }        

   addToCart (product: Product, quantity: number): void 
   {
      let cartItem = this.shoppingCart.cartItems.find(cartItem => cartItem.productId === product.id);
      if(!cartItem){ this.addNewCartItem(product); return; } 
      this.updateCartItemQuantity(product.id, quantity);
   }

  updateCartItemQuantity(productId: number, quantity: number): void 
  {
    this.updateCartItemQty(productId, quantity);
    this.UpdateCartRequest();
  }

  EmmitShoppingCartData() : void
  {
    this.cartItemsEmiter.next(this.shoppingCart.cartItems);
    this.calculateCartTotal();
    this.updateCartItemsCounter();
  }

  private updateCartItemsCounter() : void 
  {
    this.cartItemsCounter = 0;

    this.shoppingCart.cartItems.forEach(cartItem => {
      this.cartItemsCounter += cartItem.quantity
    });

    this.cartItemsCounterEmiter.next(this.cartItemsCounter);
  }

   private addNewCartItem(product: Product) : void 
   {
    this.AddToCart(product);
    this.UpdateCartRequest();
   }

  private AddToCart(product: Product): void 
  {
    let cartItem = this.createNewCartItemObject(product);
    this.shoppingCart.cartItems.push(cartItem);
  }

  //what to do about this subscription
  private UpdateCartRequest() : Subscription
  {
    const url = `${this.Url.ShoppingCart}/${this.shoppingCart.id}`
    return this.httpClient.put<ShoppingCart>(url, this.shoppingCart)
                  .pipe(
                    tap(_ => console.log('Product Updated'))
                  )
                  .subscribe(cart => {
                    this.shoppingCart = cart;
                    this.RunPostUpdateEvents();
                  });
  }

  private updateCartItemQty(productId: number, quantity: number): void 
  {
    let cartItem = this.shoppingCart.cartItems.find(ci => ci.productId == productId);
    cartItem.quantity = cartItem.quantity + quantity;
    if(cartItem.quantity <= 0) this.removeCartItemFromCart(cartItem);
  }

  private removeCartItemFromCart(cartItem: CartItem) : void 
  {
    let index = this.shoppingCart.cartItems.findIndex(item => item == cartItem);
    this.shoppingCart.cartItems.splice(index, 1);
  }

  private initShoppingCart() : void
  {
    if(this.shoppingCart) return;

    //TODO refactor/registered users
    //+ we are created shopping cart, getting created cart from backed
    //and then we get the cart again - redundant call, also to refactor
    
    let cartId = localStorage.getItem(this.localStorageKeys.shoppingCartID);
    if(!cartId){  this.CreateNewShoppingCart(); return; }

    this.getCart(Number(cartId));
  }

  private async CreateNewShoppingCart() : Promise<void>
  {
    let cartResult = await this.createNewShoppingCartRequest();
    if(!cartResult) new Error("Shopping Cart not returned!");

    localStorage.setItem(this.localStorageKeys.shoppingCartID, cartResult.id.toString());
    this.shoppingCart = cartResult;
  }

  //what to do about this subscription
  private getCart(cartID: number) : Subscription{
    const url = `${this.Url.ShoppingCart}/${cartID}`;
    return this.httpClient.get<ShoppingCart>(url)
    .pipe(
      tap(_ => console.log('Cart Fetched'))
    ).subscribe(cart => {
      this.shoppingCart = cart;
      this.EmmitShoppingCartData();
    });
  }

  private createNewShoppingCartRequest() : Promise<ShoppingCart> {
    let shoppingCart = new ShoppingCart(new Date().getTime());
    return this.httpClient.post<ShoppingCart>(this.Url.ShoppingCart, shoppingCart, 
      {
          headers: new HttpHeaders({'Content-Type':  'application/json'})
      })
      .pipe(
        tap(_ => console.log('Shopping Cart Created'))
      ).toPromise();
  }

  private RunPostUpdateEvents() : void
  {
    this.EmmitShoppingCartData();
    let flashMessage = this.flashMessageService.createFlashMessage("Success!", FlashMessageType.success);
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
  }

  

  private createNewCartItemObject(product: Product) : CartItem
  {
    let cartItem = new CartItem(this.shoppingCart.id, product.id, 1);
    return cartItem;
  }

  private calculateCartTotal() : void
  {
    this.cartTotal = this.shoppingCart.cartItems.reduce((total, item) => {
      return total += item.itemTotal;
    }, 0);
    this.cartTotalEmiter.next(this.cartTotal);
  }
}