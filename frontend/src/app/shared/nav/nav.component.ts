import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../helpers/auth.service';

import  { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private userToken: String;

  logout() {
    this.userToken = '';
    this.authService.logout();
  }

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.userToken =  localStorage.getItem('token');
  }
  
  ngAfterContentChecked() {
    this.userToken =  localStorage.getItem('token');
  }

}
