import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(){}

  onSubmit(loginForm: NgForm){
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    // chiamare authservice
  }
}
