import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../interface/ticket';
import { TicketStatus } from '../interface/ticket-status';


@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrl: './create-ticket-modal.component.css'
})
export class CreateTicketModalComponent implements OnInit{

  @Input() isEdit: boolean = false;
  @Input() ticket: Ticket={
    id: 0,
    title: '',
    description: '',
    status: TicketStatus.OPEN,
    assignedTo: undefined,
    priority: undefined,
    createdTime: new Date().toISOString(),
    updatedTime: undefined
  };


  constructor( public modal: NgbActiveModal, private ticketService: TicketService) {}

  ngOnInit(): void {
    if (!this.isEdit) {
      this.ticket.createdTime = new Date().toISOString();
    }
  }

  saveTicket(): void {
    if (this.isEdit) {
      const userId = this.ticket.assignedTo?.id || 0;  // Assumes `assignedTo` contains a user object
      const statusToUpdate = this.ticket.status ?? TicketStatus.OPEN;
      this.ticketService.updateUserTicketStatus(this.ticket.id, userId, statusToUpdate).subscribe({
        next: (updatedTicket) => {
          console.log('Ticket updated:', updatedTicket);
          this.modal.close('ticket updated');
        },
        error: (error) => {
          console.error('Error updating ticket:', error);
          alert('Error updating ticket: ' + error.message);
        }
      });
    } else {
      this.ticketService.createTicket(this.ticket).subscribe({
        next: (newTicket) => {
          console.log('Ticket created:', newTicket);
          this.modal.close('ticket created');
        },
        error: (error) => {
          console.error('Error creating ticket:', error);
          alert('Error creating ticket: ' + error.message);
        }
      });
    }
  }




}
