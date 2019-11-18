import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../helpers/auth.service';

import  { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // private userToken: String;
  private isLogged: boolean;

  logout() {
    this.authService.logout();
  }

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let token = localStorage.getItem('token')
    this.isLogged =  token ? true : false;
  }
  
  ngAfterContentChecked() {
    let token = localStorage.getItem('token')
    this.isLogged =  token ? true : false;
  }

}
