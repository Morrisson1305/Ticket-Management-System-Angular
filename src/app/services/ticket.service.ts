import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../interface/ticket';
import { TicketStatus } from '../interface/ticket-status';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}


  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/users/${ticketId}`);
  }

  getTicketsByUser(userId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/user-ticket/${userId}`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  updateUserTicketStatus(ticketId: number, userId: number, status: TicketStatus): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${ticketId}/user/${userId}/status`, { status });
  }

  deleteTicket(ticketId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
  }

}
