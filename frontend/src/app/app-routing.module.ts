import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent as UserForm } from './users/form/form.component'; 
import { HomeComponent as UserHome } from './users/home/home.component'; 
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'users', component: UserHome },
  { path: 'users/form', component: UserForm },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
