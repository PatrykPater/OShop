import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './account/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FlashMessageService } from './services/flash-message.service';
import { FlashMessageTypeDirective } from './directives/flash-message-type-style.drective';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterComponent } from './account/register/register.component';
import { AuthCallbackComponent } from './account/auth-callback/auth-callback.component';
import { FeaturedComponent } from './home/featured/featured.component';
import { FeaturedItemComponent } from './home/featured-item/featured-item.component';
import { HeroHomepageComponent } from './home/hero/hero-homepage.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { SlideComponent } from './home/carousel/slide/slide.component';
import { SlidePositionDirective } from './home/carousel/slide/slide-position.directive';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    FlashMessageComponent,
    FlashMessageTypeDirective,
    RegisterComponent,
    AuthCallbackComponent,
    HeroHomepageComponent,
    FeaturedComponent,
    FeaturedItemComponent,
    CarouselComponent,
    SlideComponent,
    SlidePositionDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    DataTablesModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    FlashMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
