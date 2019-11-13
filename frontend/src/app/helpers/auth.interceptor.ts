import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { environment } from './../../environments/environment';


import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let clone = request.clone({
            url: `${environment.baseURL}${request.url}`
        });

        const token = localStorage.getItem('token');
        
        if (token) {
            clone = clone.clone({
                setHeaders: { 
                    Authorization: `${token}`
                }
            });
        } else {
            this.authService.logout();
        }

        return next.handle(clone);
    }
}