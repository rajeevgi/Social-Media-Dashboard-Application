import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../../model/user';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user).subscribe((res: any) => {
      if (res.user.role === 'Admin') {
        localStorage.setItem('User-data', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.token));
        alert(`${res.user.username} login successful...`);
        this.router.navigateByUrl('app-admin-dashboard');
      } else if(res.user.role === 'User') {
        localStorage.setItem('User-data', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.token));
        alert(`${res.user.username} login successful...`);
        this.router.navigateByUrl('app-user-dashboard');
      }
    });
  }
}
