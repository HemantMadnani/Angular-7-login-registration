import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'Apexx Portal';
  login = 'Login';
  loginlink = '/login';
  currentUser: User;
  logoutv = 'Logout';

  ngOnInit() {
  }
  constructor(
      private router: Router,
      private authenticationService: LoginService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
