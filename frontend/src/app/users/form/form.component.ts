import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  _id = '';
  email = '';
  name = '';
  password = '';
  passwordC = '';
  contatos = [];
  contactType = '';
  contactValue = '';
  hasError = false;
  hasSuccess = false;
  errorMsg = '';
  successMsg = '';

  addContato() {
    this.contatos.push({type: this.contactType, value: this.contactValue });
    this.contactType = '';
    this.contactValue = '';
  }

  confirmForm() {

    this.hasError = false;
    this.hasSuccess = false;
    this.errorMsg = '';
    this.successMsg = '';

    if ( this.email && this.name && this.contatos.length > 0 ) {

      if (this._id) {
        this.http.patch<any>(`v1/users/${this._id}`, {
          email: this.email,
          name: this.name,
          password: this.password,
          contatos: this.contatos,
        }).subscribe((response) => {
          if (response.success) {
            this.hasSuccess = true;
            this.successMsg = 'Editado com sucesso';
            this.router.navigate(['users']);
          } else {
            this.hasError = true;
            this.errorMsg = response.err;
          }
        })
      } else if (this.password && (this.password === this.passwordC)) {
        
        this.http.post<any>('v1/users', {
          email: this.email,
          name: this.name,
          password: this.password,
          contatos: this.contatos,
        }).subscribe((response) => {
          if (response.success) {
            this.hasSuccess = true;
            this.successMsg = 'Cadastrado com sucesso';  
            this.router.navigate(['users']);
          } else {
            this.hasError = true;
            this.errorMsg = response.err;
          }
        })
      } else {
        this.hasError = true;
        this.errorMsg = 'A confirmação de senha deve ser igual à senha ';  
      }
      
    } else {
      this.hasError = true;
      this.errorMsg = 'Informe o nome, email, senha (deve ser igual à confirmação) e pelo meno um contato';
    }
  }

  getUser(id:String) {
      this.http.get<any>(`v1/users/${id}`,)
      .subscribe((response) => {
        this._id = response.data._id;
        this.email = response.data.email;
        this.name = response.data.name;
        this.contatos = response.data.contatos;
      })
  }

  constructor(private http:HttpClient, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    
    this._id = this.route.snapshot.params['id'];

    if (this._id) {
      this.getUser(this._id);
    }
  }

}
