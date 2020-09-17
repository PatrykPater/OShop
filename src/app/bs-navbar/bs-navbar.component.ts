import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  authenticationSubscription: Subscription;

  cartItemsCounter: number;
  counterSubscription: Subscription;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService) 
              {
                  this.authenticationSubscription = this.auth.authNavStatus$.subscribe(status => {
                    this.isAuthenticated = status
                  });
              }

  ngOnInit(): void {
    this.counterSubscription = this.shoppingCartService.cartItemsCounterEmiter.subscribe(counter => this.cartItemsCounter = counter);
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
