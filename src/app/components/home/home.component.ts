import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor( public authService: AuthService, private router: Router){
    this.authService.setIsLoggedIn();
    //Controllo che un utente non sia gia loggato.
    //In caso sia gia loggato rimando a Home senza caricare il resto
    if (this.authService.getIsLoggedIn()) {
      // alert("Utente gia loggato! Effettua il Logout !")
      // this.router.navigate(['/Home']);
    }
  }
    
    ngOnInit(): void {
  
    }

    Logout(){
      this.authService.Logout();
    }
}
