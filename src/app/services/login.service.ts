import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private router: Router;
  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const formData = new HttpParams( {
      fromObject: {
          email,
          password
      }
  });

    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

    return this.http.post<any>(`http://localhost:8080/springsecwithhib/authLog`, formData, httpOptions)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
            //   if (user && user.token) {
              if (user ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  signin(email: string, password: string) {
      const formData = new HttpParams( {
          fromObject: {
              email,
              password
          }
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      console.log("in signin");
      return this.http.post<any>(`http://localhost:8080/springsecwithhib/authLog`, formData, httpOptions)
      .subscribe(data => {
        console.log('LOGIN SUCCESS',data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['']);
              }
      ,error => {
        console.log('Error',error);
      });
    }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
