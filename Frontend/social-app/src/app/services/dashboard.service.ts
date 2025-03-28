import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  userUrl = "http://localhost:5000/api/user";

  constructor(private http : HttpClient) { }

  // User's API
  getAllUsers() : Observable<any> {
    return this.http.get(`${this.userUrl}/getAllUsers`);
  }
}
