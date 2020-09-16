import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthCallbackComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})

export class AccountModule { }
