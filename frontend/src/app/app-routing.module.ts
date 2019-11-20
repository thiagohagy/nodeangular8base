import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '*',
    redirectTo: 'users'
  },
  {
    path: 'users', 
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
