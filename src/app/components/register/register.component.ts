import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  constructor(private authService: AuthService){}

  ngOnInit(): void{
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?]).{8,}$/;
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.pattern(passwordPattern)])
    })
  }

  onRegister(registerForm: FormGroup){
    const email = registerForm.value.email;
    const password = registerForm.value.password;
    let _expirationdate: Date ;
    const user: User = new User(email, password)
    console.log(registerForm);
    this.authService.Register(user).subscribe((data: any) =>{
      //*todo gestisci caso utente gia registrato
      console.log(data);
      _expirationdate = new Date(new Date().getTime() + data.expiresIn * 1000);
      user.set_Expirationdate(_expirationdate);
      user.set_Token(data.idToken);
      console.log(user);
      
      this.authService.createUser(user)
      localStorage.setItem('user', JSON.stringify(this.authService.user))
    });
    registerForm.reset();
  }
}
