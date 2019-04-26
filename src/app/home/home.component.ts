import { Component, OnInit } from '@angular/core';
import { User } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 


  }

  ngOnInit() {
console.log(JSON.parse(localStorage.getItem('currentUser')).accessToken);
  }

}
