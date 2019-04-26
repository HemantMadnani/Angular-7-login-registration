import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../model/transaction.model';
import { TransactionsComponent } from '../transactions/transactions.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'Apexx Portal';
  login = 'Login';
  loading = false;
  loginlink = '/login';
  currentUser: User;
  logoutv = 'Logout';
  transactionState: TransactionsComponent;
  transactions: Transaction[] = [];
  ngOnInit() {
  }
  constructor(
    private router: Router,
    private authenticationService: LoginService,
    private transactionService: TransactionService,
    private alertService: AlertService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  fetchCapture() {
    // this.transactionService.fetchCaptureTransaction().pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.transactions = data;
    //     } );
    this.router.navigate(['/transactions']);
  }
  fetchRefund() {
   // this.router.navigate(['/transactions']);
  }
  fetchCancel() {
    // this.router.navigate(['/transactions']);
  }

}
