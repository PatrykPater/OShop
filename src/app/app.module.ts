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
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NewUserComponent } from './new-user/new-user/new-user.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

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
    NewUserComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'register', component: NewUserComponent},
      {path: 'login', component: LoginComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
      {
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService, 
    AdminAuthGuardService,
    CategoryService,
    ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
