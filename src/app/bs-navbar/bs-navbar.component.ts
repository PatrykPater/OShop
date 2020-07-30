import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;

  cartItemsCounter: number;
  counterSubscription: Subscription;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  ngOnInit(): void {
    this.counterSubscription = this.shoppingCartService.cartItemsCounterEmiter.subscribe(counter => this.cartItemsCounter = counter);
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }

  logout(){ 
    this.auth.logout();
   }
}
