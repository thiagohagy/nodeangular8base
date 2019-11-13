import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './users/home/home.component';
import { FormComponent } from './users/form/form.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthGuard } from './helpers/auth.guard';
import { BuscaDetalhadaComponent } from './users/busca-detalhada/busca-detalhada.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    LoginComponent,
    NavComponent,
    BuscaDetalhadaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
