import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[];
  cartItemsSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }
  
  ngOnInit(): void {
    this.cartItemsSub = this.shoppingCartService.cartItemsEmiter.subscribe(items => this.cartItems = items);
    this.cartItems = this.shoppingCartService.shoppingCart.items;
  }

  ngOnDestroy(): void {
    this.cartItemsSub.unsubscribe();
  }

  increaseQty(event: MouseEvent): void{
    this.changeCartItemQty(event, 1);
  }

  decreaseQty(event: MouseEvent): void{
    this.changeCartItemQty(event, -1);
  }

  private changeCartItemQty(event: MouseEvent, quantity: number){
    let productId: string = (event.target as Element).id;
    this.shoppingCartService.updateCartItemQuantity(productId, quantity);
  }
}
