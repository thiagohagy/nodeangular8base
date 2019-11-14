import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

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
    if (this.data && this.name) {
      this.http.get<any>(`v1/users/filter?name=${this.name}&date=${this.data}`).subscribe((response) => {
        this.users = response.data;
        
        if (this.users.length == 0) {
          this.showMsg = true;
        }
      })
    } else {
      this.toastr.warning('Informe uma data e um nome(pode ser parcial)', 'Ops!!!'); 
    }
  }

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

  ngOnInit() {
  }

}
