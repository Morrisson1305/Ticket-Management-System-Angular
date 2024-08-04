import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../interface/ticket';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit{

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  selectedStatus: string = 'ALL';


  constructor(private ticketServic: TicketService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(){
    const userId = this.authService.currentUserValue;
    this.ticketServic.getAllTickets().subscribe(data => {
      this.tickets = data;
      this.filterTickets();
    });
  }

  filterTickets() {
    if(this.selectedStatus === 'ALL') {
      this.filteredTickets = this.tickets;
    }
    else {
      this.filteredTickets = this.tickets.filter(ticket => ticket.status === this.selectedStatus);
    }
  }



}
