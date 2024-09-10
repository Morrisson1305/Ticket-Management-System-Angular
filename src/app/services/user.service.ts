import { User } from './../interface/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }


  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }


  getUserByEmail(email:string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${email}`);
  }

  getUserByScore(score: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${score}`);
  }

  getUserWithHighestScore():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/score`);
  }

  getUserScoreWithinRange(userId: number, startDate: string, endDate: string): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/${userId}/score`, {params: {startDate, endDate}});
  }

  // getUserScoresWithinDateRange(startDate: string, endDate: string): Observable<UserScoreDTO[]> {
  //   return this.http.get<UserScoreDTO[]>(`${this.baseUrl}/scores/range?startDate=${startDate}&endDate=${endDate}`);
  // }

  registerUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register/`, {user});
  }
}
