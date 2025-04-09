import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-get-user',
  imports: [],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.css'
})
export class GetUserComponent implements OnInit {

  userData : any;

  constructor(private userService : UserService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if(username){
        this.userService.getUserByUsername(username).subscribe({
          next: (res : any) => {
            this.userData = res.user;
            console.log(this.userData);
          },
          error: err => {
            console.error(err);
          }
        });
      }
    });
    
  }


} 
