import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/authguard.service';
import { TicketComponent } from './component/ticket/ticket.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ManagerUserComponent } from './component/manage-user/manager-user.component';

const routes: Routes = [
  {path: '', component: UserDashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'manage-user', component: ManagerUserComponent},
  {path: 'tickets', component: TicketComponent},
  // {path: 'tickets', component: TicketComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
