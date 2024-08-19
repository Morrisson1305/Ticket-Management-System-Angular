import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../interface/ticket';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  public getTickets(): void {
    this.ticketService.getAllTickets().subscribe({
        next: (response: Ticket[]) => {
            this.tickets = response;
            console.log(this.tickets);
        },
        error: (error: HttpErrorResponse) => {
            alert(error.message);
        },
        complete: () => {
            console.log('Ticket retrieval complete');
        }
    });
}


public searchTickets(key: string): void {
  console.log('Search key:', key);
  if (!key) {
    this.getTickets();
    return;
  }
  const lowerKey = key.toLowerCase();
  this.tickets = this.tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(lowerKey) ||
    (ticket.assignedTo && ticket.assignedTo.name.toLowerCase().includes(lowerKey)) ||
    ticket.description.toLowerCase().includes(lowerKey) ||
    ticket.priority && ticket.priority.toLowerCase().includes(lowerKey) ||
    ticket.status && ticket.status.toLowerCase().includes(lowerKey) ||
    ticket.createdTime.toLowerCase().includes(lowerKey)
  );
  if (this.tickets.length === 0) {
    this.getTickets();
  }
}


}
