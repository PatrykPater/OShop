import { Component, OnInit } from '@angular/core';
import { UserRegistration } from 'src/app/models/user-registration';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: '', email: '', password: ''};
  submitted: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() { 
    this.http.post('authapiUrl', this.userRegistration)
                .pipe()
                .subscribe(response => {
                  debugger;
                });
  }
}
