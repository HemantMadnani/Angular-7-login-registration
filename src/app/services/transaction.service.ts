import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../model/transaction.model';
import { User } from '../model/user.model';
import { LoginService } from '.';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  currentUser: User;
  constructor(private http: HttpClient,
              private authenticationService: LoginService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     }
 public fetchCaptureTransaction() {
    const httpOptions = {
      headers: new HttpHeaders({
        'apexxkey': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).accessToken
      })
    };
    console.log('Bearer ' + JSON.parse(localStorage.getItem('currentUser')).accessToken);
    return this.http.get<Transaction[]>('http://localhost:8080/springsecwithhib/home/transaction/fetch', httpOptions);
  }

}
