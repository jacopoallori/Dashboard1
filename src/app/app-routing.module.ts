import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
  {path: '', component: DashboardComponent,
  // canActivate: [AuthGuard], 
  children:[
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'ToDolist', component: TodolistComponent},    
    {path: 'News', component: NewsComponent},
    {path: 'Weather', component: WeatherComponent},
    {path: 'Maps', component: MapsComponent},
    {path: 'Calendar', component: CalendarComponent},
    {path: 'Rubrica', component: AddressBookComponent},
    {path: 'RegistroChiamate', component: CallLogComponent},
    {path: 'Message', component: MessageComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
