import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { CheckoutCartItem } from '../models/checkout-cart-item';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  checkoutCartItems: CheckoutCartItem[] = [];
  products: Product[];

  productSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService,
              private productService: ProductService) { }
  

  ngOnInit(): void {
    this.initCheckout();
  }

  initCheckoutCartItems(){
    this.shoppingCartService.shoppingCart.items.forEach(cartItem => {
      let product = this.products.find(p => p.key === cartItem.productId);
      this.addCheckoutItem(product, cartItem);
    });
  }

  initCheckout(){
    this.productService.getAll()
                       .subscribe(products => {
                        this.products = products;
                        this.initCheckoutCartItems();
                       });
  }

  private addCheckoutItem(product: Product, cartItem: CartItem){
    let checkoutItem = this.createCheckoutCartItem(product, cartItem);
    this.checkoutCartItems.push(checkoutItem);
  }

  private createCheckoutCartItem(product: Product, cartItem: CartItem): CheckoutCartItem{
    let checkoutCartItem: CheckoutCartItem = { 
      name: product.title,
      imgUrl: product.imageUrl,
      price: product.price,
      quantity: cartItem.quantity,
      total: this.calculateCartItemTotal(product, cartItem.quantity)
    }

    return checkoutCartItem;
  }

  private calculateCartItemTotal(product: Product, qty: number) : number{
    return product.price * qty;
  }

}
