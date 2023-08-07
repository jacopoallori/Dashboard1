import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { NewsComponent } from './components/news/news.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { MessageComponent } from './components/message/message.component';
import { CallLogComponent } from './components/call-log/call-log.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'Home', component: HomeComponent, children:[
    {path: 'ToDolist', component: TodolistComponent},    
    {path: 'News', component: NewsComponent, canActivate: [AuthGuard]},
    {path: 'Weather', component: WeatherComponent, canActivate: [AuthGuard]},
    {path: 'Maps', component: MapsComponent, canActivate: [AuthGuard]},
    {path: 'Calendar', component: CalendarComponent, canActivate: [AuthGuard]},
    {path: 'Rubrica', component: AddressBookComponent, canActivate: [AuthGuard]},
    {path: 'RegistroChiamate', component: CallLogComponent, canActivate: [AuthGuard]},
    {path: 'Message', component: MessageComponent, canActivate: [AuthGuard]}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**',redirectTo: 'Home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
