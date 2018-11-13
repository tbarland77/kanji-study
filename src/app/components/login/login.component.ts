import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent  {
  email: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) { }

  // ngOnInit() {
  //   // stub
  //   console.dir(this.authService.authState);
  // }

  signup() {
    this.authService.signup(this.email, this.password);
  }

  login() {
    this.authService.login(this.email, this.password);
  }

  logout() {
    this.authService.logout();
  }

  goToMainMenu() {
    this.router.navigateByUrl('/menu');
  }

}
