import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { environment } from './../../environments/environment';


import { AuthenticationService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthenticationService,
        private loaderService: LoaderService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loaderService.isLoading.next(true);

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

        return next.handle(clone).pipe(tap(evt => {                
            if (evt.type == HttpEventType.Response) {
                this.loaderService.isLoading.next(false);
            }
        }));
    }
}