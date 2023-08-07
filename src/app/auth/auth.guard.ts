import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    if(this.authService.isLoggedIn){
      return true;
    }else{
      alert("Per navigare in questa sezione devi effettuare il Login")
      //this.router.navigate(['/login'])
      return false; 
    }
  }

  isLogged(){
    // //*todo
    // // Giusto gestire questa cosa qui? 
    // // C'è un modo migliore ?
    // //Controllo se l'utente è gia loggato e sopratutto se il token è ancora valido
    // const user  = localStorage.getItem('user');
    //   if(user){
    //     this.datiUtenti  = JSON.parse(user);
    //     if(new Date() < new Date(this.datiUtenti._expirationdate)){
    //       console.log("Utente gia loggato con token valido");
    //       this.authService.isLoggedIn = true;
    //     }else{
    //       console.log("Utente non loggatoo");
    //       this.authService.isLoggedIn = false;
    //       localStorage.removeItem('user');
    //     }
    //   }      
  }
}