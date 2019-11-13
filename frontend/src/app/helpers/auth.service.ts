import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public token:Subject<any>;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient, private router: Router) {
    }


    async login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.post<any>('login', {email, password }, this.httpOptions)
            .subscribe(response => {

                if (response.success) {
                    localStorage.setItem('token', response.token);
                    this.token = response.token;

                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        })

    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}