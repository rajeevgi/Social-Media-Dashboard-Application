import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

user : User = new User();

constructor(private authService : AuthService, private router : Router){}

onRegister() {
  this.authService.register(this.user).subscribe(( res : any) => {
    alert('User Registration Successful...');
    this.router.navigateByUrl('app-login');
  });
}

}
