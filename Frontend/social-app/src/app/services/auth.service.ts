import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:5000/api/auth";

  constructor(private http : HttpClient) { }

  // Login
  login(data : any) : Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, data, { withCredentials : true });
  }

  // Register
  register(data : any) : Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, data, { withCredentials : true });
  }
}
