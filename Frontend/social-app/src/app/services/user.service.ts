import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:5000/api/user';

  constructor(private http : HttpClient) { }

  getUserByUsername(username : String) : Observable<any> {
    return this.http.get<any>(`${this.userUrl}/getUserByUsername/${username}`);
  }

}
