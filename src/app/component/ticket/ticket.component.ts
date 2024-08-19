import { Ticket } from './../../interface/ticket';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TicketStatus } from '../../interface/ticket-status';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTicketModalComponent } from '../../create-ticket-modal/create-ticket-modal.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  selectedStatus: string = 'ALL';

  trashIcon = faTrash;
  pencilIcon = faPencilAlt;
  plusIcon = faPlus;

  public ticket: Ticket = {
    id: 0,
    title: '',
    description: '',
    status: TicketStatus.OPEN,  // Default status or as needed
    assignedTo: undefined,
    priority: undefined,
    createdTime: new Date().toISOString(),
    updatedTime: undefined
  };
  public deleteTicket: Ticket | undefined;


  constructor(private ticketService: TicketService, private authService: AuthService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.loadTickets();
   this.getTickets();

  }

  public getTickets(): void {
    this.ticketService.getAllTickets().subscribe({
        next: (response: Ticket[]) => {
            this.tickets = response;
            this.filteredTickets = this.tickets;
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


  // public onCreateTicket(): void {
  //   const modalRef = this.modal.open(CreateTicketModalComponent);
  //   modalRef.componentInstance.isEdit = false;
  //   modalRef.result.then((result) => {
  //     if (result === 'success') {
  //       this.getTickets();
  //     }
  //   }).catch((error) => {
  //     console.error('Modal closed with error:', error);
  //   });
  // }

  onOpenModal(ticket?: Ticket, isEdit: boolean = false): void {
    const modalRef = this.modal.open(CreateTicketModalComponent);
    modalRef.componentInstance.isEdit = isEdit;
    modalRef.componentInstance.ticket = ticket ? { ...ticket } : undefined;

    modalRef.result.then((result) => {
      if (result === 'ticket created' || result === 'ticket updated') {
        this.getTickets();
      }
    });
  }



    public onDeleteTicket(ticketId: number): void {
      this.ticketService.deleteTicket(ticketId).subscribe({
        next: () => {
          console.log('Ticket deleted successfully');
          this.getTickets();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error deleting ticket:', error);
          alert('Error deleting ticket: ' + error.message);
        },
        complete: () => {
          console.log('Ticket deletion process completed.');
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


  loadTickets(){
    const userId = this.authService.currentUserValue;
    this.ticketService.getAllTickets().subscribe(data => {
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

  //  onOpenModal (ticket: any) {
  //   const modal = this.modal.open(CreateTicketModalComponent)

  //  }






}

