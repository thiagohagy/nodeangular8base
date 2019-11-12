import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = []; 


  fetchUsers() {
    this.http.get<any>(`${environment.baseURL}v1/users/list`).subscribe((response) => {
      this.users = response.data;
    })
  }

removeUser(id: String) {
    if(confirm('Deseja realmente remover o usuario?')) {
      this.http.delete<any>(`${environment.baseURL}v1/users/${id}`).subscribe((response) => {
        this.fetchUsers();
      })
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

}
