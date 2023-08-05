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
  stringLogin: string =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${this.APIkey}`;

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: User){
    this.user = new User(user.email, user.password, user._token, user._expirationdate);
    this.isLoggedIn = true;
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
