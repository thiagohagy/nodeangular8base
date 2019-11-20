import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      { 
        path: 'login',
        component: LoginComponent 
      },  
    ]),
  ],
  exports: [
    LoginComponent,
    RouterModule
  ]
})

export class AuthModule {}