import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent as UserForm } from './users/form/form.component'; 
import { HomeComponent as UserHome } from './users/home/home.component'; 
import { LoginComponent } from './auth/login/login.component';
import { BuscaDetalhadaComponent } from './users/busca-detalhada/busca-detalhada.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'buscaDetalhada', canActivate: [AuthGuard], component: BuscaDetalhadaComponent  },
  { path: 'users', canActivate: [AuthGuard], component: UserHome },
  { path: 'users/form', canActivate: [AuthGuard], component: UserForm },
  { path: 'users/form/:id', canActivate: [AuthGuard], component: UserForm },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
