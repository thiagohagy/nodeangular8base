import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                
        const token = this.authService.token;
        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `${token}`
                }
            });
        } else {
            this.authService.logout();
        }

        return next.handle(request);
    }
}