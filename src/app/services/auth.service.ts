import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/user-registration';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// Observable navItem source
private _authNavStatusSource = new BehaviorSubject<boolean>(false);
// Observable navItem stream
authNavStatus$ = this._authNavStatusSource.asObservable();

// user$: Observable<firebase.User>

private manager = new UserManager(getClientSettings());
private user: User | null;

  constructor(private httpClient: HttpClient) 
  {
    this.manager.getUser().then(user => this.user = user);
  }

  login() { return this.manager.signinRedirect(); }

  isAuthenticated(): boolean { return this.user != null && !this.user.expired; }

  register(userRegistration: UserRegistration) 
  {    
    this.httpClient.post('https://localhost:44353/Account/Register', userRegistration)
                   .pipe()
                   .subscribe(response => { response });
  }

  async completeAuthentication() 
  {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated());
  }
}


export function getClientSettings(): UserManagerSettings {
  return {
      authority: 'https://localhost:44353',
      client_id: 'angular_spa',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'https://localhost:4200',
      response_type:"id_token token",
      scope:"openid",
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
