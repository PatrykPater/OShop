import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/cart-item';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[];
  cartTotal: number;

  cartTotalSub: Subscription;
  cartItemsSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }
  
  ngOnInit(): void {
    this.cartItemsSub = this.shoppingCartService.cartItemsEmiter.subscribe(items => this.cartItems = items);
    this.cartTotalSub = this.shoppingCartService.cartTotalEmiter.subscribe(total => this.cartTotal = total);

    this.shoppingCartService.EmmitShoppingCartData();
  }

  ngOnDestroy(): void 
  {
    this.cartItemsSub.unsubscribe();
    this.cartTotalSub.unsubscribe()
  }

  increaseQty(event: MouseEvent): void
  {
    this.changeCartItemQty(event, 1);
  }

  decreaseQty(event: MouseEvent): void
  {
    this.changeCartItemQty(event, -1);
  }

  private changeCartItemQty(event: MouseEvent, quantity: number) : void
  {
    let productId: number = Number((event.target as Element).id);
    this.shoppingCartService.updateCartItemQuantity(productId, quantity);
  }
}
