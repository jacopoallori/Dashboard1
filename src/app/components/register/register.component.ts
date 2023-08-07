import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?]).{8,}$/;
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(passwordPattern)])
    })
  }

  onRegister(registerForm: FormGroup) {
    const email = registerForm.value.email;
    const password = registerForm.value.password;
    let _expirationdate: Date;
    const user: User = new User(email, password)

    //Chiamo il servizio per registrazione utente
    this.authService.Register(user).subscribe((data: any) => {

      _expirationdate = new Date(new Date().getTime() + data.expiresIn * 1000);
      user.set_Expirationdate(_expirationdate);
      user.set_Token(data.idToken);
      this.authService.createUser(user)
      localStorage.setItem('user', JSON.stringify(this.authService.user))

    },(error : any)=>{

      //Gestione dei possibili errore al momento della registrazione
      if(error.error.error.code === 400 ){
        if(error.error.error.message === 'EMAIL_EXISTS'){
          console.log("l'indirizzo email è già utilizzato da un altro account.");
          alert("l'indirizzo email è già utilizzato da un altro account.")
        }else if(error.error.error.message === 'OPERATION_NOT_ALLOWED'){
          console.log("l'accesso con password è disabilitato per questo progetto.");
          alert("l'accesso con password è disabilitato per questo progetto.")
        }else if(error.error.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER'){
          console.log("Abbiamo bloccato tutte le richieste da questo dispositivo a causa di attività insolite. Riprovare più tardi.");
          alert("Abbiamo bloccato tutte le richieste da questo dispositivo a causa di attività insolite. Riprovare più tardi.")
        }
      }

    });
    registerForm.reset();
  }
}
