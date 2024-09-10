import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserType } from './interface/user-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  isTicketManager: boolean = false;
  isUser: boolean = false;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isTicketManager = user?.role === UserType.TICKET_MANAGER;
      this.isUser = user?.role === UserType.USER;
    });
  }
  title = 'helpdesk2';
}
