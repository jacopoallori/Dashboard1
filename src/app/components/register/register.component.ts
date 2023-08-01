import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(){}

  onSubmit(registerForm: NgForm){
    const email = registerForm.value.email;
    const password = registerForm.value.password;
  }
}
