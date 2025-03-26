import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../../model/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  user : User = new User();
  
  constructor(private authService : AuthService, private router : Router){}
  
  onLogin() {
    this.authService.login(this.user).subscribe(( res : any) => {
      alert('User Login-In Successful...');
      localStorage.setItem('token', JSON.stringify(res.user));
      this.router.navigateByUrl('app-user-dashboard');
    });
  }

}
