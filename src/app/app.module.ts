import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketService } from './services/ticket.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { TicketComponent } from './component/ticket/ticket.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CreateTicketModalComponent } from './create-ticket-modal/create-ticket-modal.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ManagerUserComponent } from './component/manage-user/manager-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './component/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './component/user-modal/user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    TicketComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CreateTicketModalComponent,
    ProfileComponent,
    ManagerUserComponent,
    ModalComponent,
    UserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [TicketService, UserService,
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
