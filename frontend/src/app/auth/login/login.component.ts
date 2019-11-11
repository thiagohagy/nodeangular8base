import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'testes';
  password = 'testes';
  showError = false;

  logar() {
    this.showError = false;
    if (this.password && this.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)){
      this.showError = false;
    } else {
      this.showError = true;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
