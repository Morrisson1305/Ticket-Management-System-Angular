import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginRequest } from '../interface/login-request';
import { Observable, BehaviorSubject, tap, map, catchError } from 'rxjs';
import { LoginResponse } from '../interface/login-response';
import { Router } from '@angular/router';
import { UserType } from '../interface/user-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();

    if (parsedUser) {
      this.currentUserSubject.next(parsedUser);  // Ensure latest user state is emitted
    }
  }


  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  private setToken(response: LoginResponse){
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    this.currentUserSubject.next(response);
  }

  private clearToken(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap({
        next: (user) => {
          this.setToken(user);
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      })
    );
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, {refreshToken})
    .pipe(
      tap((tokens: {accessToken: string}) => {
        localStorage.setItem('accessToken', tokens.accessToken);
      }),
      map(tokens => tokens.accessToken),
      catchError(err => {
        this.logout();
        return new Observable<string>();
      })

    );
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  isTicketManager(): boolean {
    return this.currentUserValue?.role === UserType.TICKET_MANAGER;
  }

  isUser(): boolean {
    return this.currentUserValue?.role === UserType.USER;
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/reset-password`, { email, newPassword });
  }


}
