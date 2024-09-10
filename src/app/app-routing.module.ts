import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { TicketComponent } from './component/ticket/ticket.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ManagerUserComponent } from './component/manage-user/manager-user.component';
import { RegisterComponent } from './component/register/register.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: UserDashboardComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'manage-users', component: ManagerUserComponent },
  {path: 'manage-tickets', component: TicketComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  // {path: 'tickets', component: TicketComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
