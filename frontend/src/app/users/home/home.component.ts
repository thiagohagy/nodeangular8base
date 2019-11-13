import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = []; 

  fetchUsers() {
    this.http.get<any>(`v1/users/list`).subscribe((response) => {
      this.users = response.data;
    })
  }

  removeUser(id: String) {
    if(confirm('Deseja realmente remover o usuario?')) {
      this.http.delete<any>(`v1/users/${id}`).subscribe((response) => {
        this.fetchUsers();
      })
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

}
