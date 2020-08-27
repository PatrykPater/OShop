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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  logout(){
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser>{
    return this.user$.pipe(
       switchMap(user => {
         if(user) return this.userService.get(user.uid).valueChanges();
         return of(null);
       })
      );
  };


  login() { 
    debugger;
    return this.manager.signinRedirect();  
  }

  register(userRegistration: UserRegistration) {    
    this.httpClient.post('https://localhost:44353/Account/Register', userRegistration)
                .pipe()
                .subscribe(response => {
                  debugger;
                });
  }
  
}

export function getClientSettings(): UserManagerSettings {
  return {
      authority: 'http://localhost:44353/Login',
      client_id: 'angular_spa',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type:"id_token token",
      scope:"openid profile email api.read",
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
