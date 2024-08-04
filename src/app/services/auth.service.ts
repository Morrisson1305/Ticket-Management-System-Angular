import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginRequest } from '../interface/login-request';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../interface/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;
  private currentUserSubject: BehaviorSubject<LoginResponse | null >;
  public currentUser: Observable<LoginResponse | null >;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null >(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponse | null{
    return this.currentUserSubject.value;
  }


  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(tap(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }));
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    //redirect
  }

  resetPassword(email: string, newPassword: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/user/reset-password`, {email, newPassword});
  }
}
