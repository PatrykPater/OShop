import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { FlashMessageService } from './flash-message.service';
import { FlashMessageType } from '../enums/flash-message-types';
import { Subject, Subscription, Observable } from 'rxjs';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private endpoins = {  Carts: '/shopping-carts/' }

  public shoppingCart: ShoppingCart;

  cartItemsCounter: number = 0;
  cartTotal: number = 0;

  cartTotalEmiter = new Subject<number>();
  cartItemsCounterEmiter = new Subject<number>();
  cartItemsEmiter = new Subject<CartItem[]>();

  constructor(private db: AngularFireDatabase,
              private flashMessageService: FlashMessageService,
              private productService: ProductService) { this.getOrCreateCart(); }

   getShoppingCart() : ShoppingCart{
     return this.shoppingCart ?? new ShoppingCart(0);
   }           

   addToCart (product: Product, quantity: number): void 
  {
    let cartItem = this.shoppingCart.items.find(cartItem => cartItem.productId === product.key);
    if(!cartItem){ this.addNewCartItem(product); return; } 
    this.updateCartItemQuantity(product.key, quantity);
  }

  updateCartItemQuantity(productId: string, quantity: number): void 
  {
    this.updateCartItemQty(productId, quantity);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Cart item quantity changed.", FlashMessageType.success);
    this.updateCartItemsCounter();
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
    this.cartItemsEmiter.next(this.shoppingCart.items);
    this.calculateCartTotal();
   }

  private updateCartItemsCounter() : void 
  {
    this.cartItemsCounter = 0;

    this.shoppingCart.items.forEach(cartItem => {
      this.cartItemsCounter += cartItem.quantity
    });

    this.cartItemsCounterEmiter.next(this.cartItemsCounter);
  }

   private addNewCartItem(product: Product) : void 
   {
    this.insertNewCartItem(product);
    let flashMessage = this.flashMessageService.createFlashMessage("Success! Product added to cart.", FlashMessageType.success);
    this.flashMessageService.flashMessageEmiter.next(flashMessage);
    this.cartItemsEmiter.next(this.shoppingCart.items);
    this.calculateCartTotal();
   }

  private insertNewCartItem(product: Product): void 
  {
    let cartItem = this.createNewCartObject(product);
    this.shoppingCart.items.push(cartItem);
    this.db.object(this.endpoins.Carts + this.shoppingCart.key).update(this.shoppingCart);
  }

  private updateCartItemQty(productId: string, quantity: number): void 
  {
    let cartItem = this.shoppingCart.items.find(ci => ci.productId == productId);
    cartItem.quantity = cartItem.quantity + quantity;
    
    if(cartItem.quantity <= 0) this.removeCartItemFromCart(cartItem);

    this.db.object(this.endpoins.Carts + this.shoppingCart.key).update(this.shoppingCart);
  }

  private removeCartItemFromCart(cartItem: CartItem) : void 
  {
    let index = this.shoppingCart.items.findIndex(item => item == cartItem);
    this.shoppingCart.items.splice(index, 1);
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


  private getCart(cartID: string): void{
    this.productService.getAll()
                        .pipe(
                          switchMap(products => this.getCartObservable(cartID, products)))
                          .subscribe(cart =>{
                            this.shoppingCart = cart;
                                      this.updateCartItemsCounter();
                                      this.calculateCartTotal();
                                      this.cartItemsEmiter.next(this.shoppingCart.items);
                          })
  }

  private createNewUserShoppingCart(): firebase.database.Reference
  {
    let shoppingCart = new ShoppingCart(new Date().getTime());
    return this.db.list(this.endpoins.Carts).push(shoppingCart);
  }

  private createNewCartObject(product: Product) : CartItem
  {
    let cartItem = new CartItem(this.shoppingCart.key, product.key, 1);
    return cartItem;
  }

  private fillProductDetails(cartItems: CartItem[], products: Product[]) : void
  {
      cartItems.forEach(cartItem => {
        let product = products.find(p => p.key == cartItem.productId);

        cartItem.name = product.title;
        cartItem.price = product.price;
        cartItem.imgUrl = product.imageUrl;
        cartItem.total = this.calculateCartItemTotal(product, cartItem.quantity);
    });
  }

  private getCartObservable(cartID : string, products: Product[]) : Observable<ShoppingCart>{
    return this.db.object(this.endpoins.Carts + cartID)
              .snapshotChanges()
              .pipe(
                map(cart => {
                  let { key, payload } = cart;
                  let shoppingCart = payload.val() as ShoppingCart;
                  shoppingCart.key = key;

                   if(!shoppingCart.items) shoppingCart.items = [];
                
                this.fillProductDetails(shoppingCart.items, products);  
                return shoppingCart;
              }))
  }

  private calculateCartItemTotal(product: Product, qty: number) : number
  {
    return product.price * qty;
  }

  private calculateCartTotal()
  {
    this.cartTotal = this.shoppingCart.items.reduce((total, item) => {
      return total += item.total;
    }, 0);
    this.cartTotalEmiter.next(this.cartTotal);
  }
}