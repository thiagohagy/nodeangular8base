import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [
    {name:'testes', email:'email', contatos: 'contatos', _id: '1'}
  ] 

  removeUser(userId: String) {
    console.log(userId);
  }

  fetchUsers() {
    
  }

  constructor() { }

  ngOnInit() {
  }

}
