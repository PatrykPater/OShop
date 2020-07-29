import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { FlashMessageService } from './services/flash-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  flashMessageSubscription: Subscription;

  constructor(private auth: AuthService, 
              private router: Router,
              private userService: UserService){

      auth.user$.subscribe(user => {
        if(!user) return;

      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');

        if(!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    })
  }
}
