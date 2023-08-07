import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.setIsLoggedIn();
    //Controllo che un utente non sia gia loggato.
    //In caso sia gia loggato rimando a Home senza caricare il resto
    if (this.authService.getIsLoggedIn()) {
      alert("Utente gia loggato! Effettua il Logout !")
      this.router.navigate(['/Home']);
    }
  }

  ngOnInit(): void {
    //Validazione del form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onLogin(loginForm: NgForm){
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    let _expirationdate: Date;
    const user: User = new User(email, password);
    console.log("passo di qui");

    //Chiamata al servizio per effettuare il login
    this.authService.Login(user).subscribe((data: any) => {
      console.log("non passo di qui");
      
      console.log(data.HttpErrorResponse);
      
      _expirationdate = new Date(new Date().getTime() + data.expiresIn * 1000);
      user.set_Expirationdate(_expirationdate);
      user.set_Token(data.idToken);
      this.authService.createUser(user)
      localStorage.setItem('user', JSON.stringify(this.authService.user))
    },(error:any)=>{

      //Gestione dei possibili errore al momento del login
      if(error.error.error.code === 400 ){
        if(error.error.error.message === 'INVALID_PASSWORD'){
          console.log("La password è sbagliata");
          alert("La password è sbagliata")
        }else if(error.error.error.message === 'EMAIL_NOT_FOUND'){
          console.log("Email non trovata");
          alert("Email non trovata")
        }else if(error.error.error.message === 'USER_DISABLED'){
          console.log("Utente disabilitato");
          alert("Utente disabilitato")
        }
      }
    });
    loginForm.reset();
  }
}
