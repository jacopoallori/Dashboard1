import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  user: User | null;
  APIkey: string ='AIzaSyBdOT3Y3R6uVf9Z5L7r0z6Nyx600haK3Bk';
  stringRegister: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIkey}`;
  stringLogin: string =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIkey}`;

  constructor(private http: HttpClient, private router: Router) { }
  datiUtenti : User ;

  createUser(user: User){
    this.user = new User(user.email, user.password, user._token, user._expirationdate);
    this.isLoggedIn = true;
  }

  setIsLoggedIn(){
    //*todo
    // Giusto gestire questa cosa qui? 
    // C'è un modo migliore ?
    //Controllo se l'utente è gia loggato e sopratutto se il token è ancora valido
    const user  = localStorage.getItem('user');
      if(user){
        this.datiUtenti  = JSON.parse(user);
        if(new Date() < new Date(this.datiUtenti._expirationdate)){
          console.log("Utente gia loggato con token valido");
          this.isLoggedIn = true;
        }else{
          console.log("Utente non loggatoo");
          this.isLoggedIn = false;
          localStorage.removeItem('user');
        }
      }      
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  Register(user: User){
    return this.http.post(this.stringRegister, {email: user.email, password: user.password, returnSecureToken:true});
  }

  Login(user: User){
    return this.http.post(this.stringLogin, {email: user.email, password: user.password, returnSecureToken:true});
  }

  Logout(){
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/Home']);
  }
}
