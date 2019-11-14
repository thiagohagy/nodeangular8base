import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = []; 
  
  paginationOpts = {
    page: 1,
    perPage: 5,
    totalUsers: 0,
  };

  fetchUsers(page:number = 1) {

    let skip = (page-1) * this.paginationOpts.perPage;
    let limit = this.paginationOpts.perPage;

    this.paginationOpts.page = page;

    this.http.get<any>(`v1/users/list?skip=${skip}&limit=${limit}`).subscribe((response) => {
      this.users = response.data;
      this.paginationOpts.totalUsers = response.total;
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
