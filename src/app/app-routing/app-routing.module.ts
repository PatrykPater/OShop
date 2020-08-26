import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { LoginComponent } from '../login/login.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { OrderSuccessComponent } from '../order-success/order-success.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { ProductFormComponent } from '../admin/product-form/product-form.component';
import { AdminAuthGuardService } from '../services/admin-auth-guard.service';
import { AdminProductsComponent } from '../admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { RegisterComponent } from '../account/register/register.component';

const routesRoot: Routes = 
[
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
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
];

const routesChldren: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},

  {path: 'register', component: RegisterComponent},

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
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routesChldren) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
