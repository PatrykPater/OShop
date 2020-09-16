import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
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

user$: Observable<firebase.User>

private manager = new UserManager(getClientSettings());
private user: User | null;

  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService: UserService,
    private httpClient: HttpClient) 
  {
    this.user$ = afAuth.authState;

    this.manager.getUser().then(user => { 
      this.user = user;
   });

  }

  logout(){ this.afAuth.signOut(); }

  login() { return this.manager.signinRedirect(); }

  isAuthenticated(): boolean { return this.user != null && !this.user.expired; }

  get appUser$() : Observable<AppUser>
  {
    return this.user$.pipe(
       switchMap(user => {
         if(user) return this.userService.get(user.uid).valueChanges();
         return of(null);
       })
      );
  };


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
      redirect_uri: 'https://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'https://localhost:4200',
      response_type:"id_token token",
      scope:"openid",
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri: 'https://localhost:4200/silent-refresh.html'
  };
}
