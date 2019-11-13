import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busca-detalhada',
  templateUrl: './busca-detalhada.component.html',
  styleUrls: ['./busca-detalhada.component.css']
})
export class BuscaDetalhadaComponent implements OnInit {

  name = '';
  data = new Date();
  users = [];
  showMsg = false;

  buscar() {
    this.showMsg = false;
    this.http.get<any>(`v1/users/filter?name=${this.name}&date=${this.data}`).subscribe((response) => {
      this.users = response.data;

      if (this.users.length == 0) {
        this.showMsg = true;
      }
    })
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
