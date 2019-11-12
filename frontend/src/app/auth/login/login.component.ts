import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../helpers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'thiago@gmail.com';
  password = '123';
  showError = false;
  showSuccess = false;

  async logar()  {
    this.showError = false;
    if (this.password && this.email){
      
      let respLogin = await this.authService.login(this.email, this.password);

      if (respLogin === true) {
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['users']);          
        }, 1000);
      } else {
        this.showError = true;
      }

    } else {
      this.showError = true;
    }
  }

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

}
