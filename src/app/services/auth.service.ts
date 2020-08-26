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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<firebase.User>


  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService: UserService,
    private httpClient: HttpClient) {
    this.user$ = afAuth.authState;
   }
  
  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
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


  register(userRegistration: UserRegistration) {    
    this.httpClient.post('https://localhost:44353/Account/Register', userRegistration)
                .pipe()
                .subscribe(response => {
                  debugger;
                });
  }
  
}
