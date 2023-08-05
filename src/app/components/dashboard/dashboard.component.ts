import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    //*todo
    // Giusto gestire questa cosa qui? 
    // C'è un modo migliore ?
    //Controllo se l'utente è gia loggato e sopratutto se il token è ancora valido
    ngOnInit(): void {
      const user  = localStorage.getItem('user');
      if(user){
        const datiUtenti: User  = JSON.parse(user);
        if(new Date() < new Date(datiUtenti._expirationdate)){
          console.log("Utente gia loggato con token valido");
        }else{
          console.log("Utente non loggatoo");
        }
      }      
    }
}
