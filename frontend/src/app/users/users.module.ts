import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AuthGuard } from './../helpers/auth.guard';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { BuscaDetalhadaComponent } from './busca-detalhada/busca-detalhada.component';

@NgModule({
    declarations: [
        HomeComponent,
        FormComponent,
        BuscaDetalhadaComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgxPaginationModule,
        RouterModule.forChild([
            { 
                path: 'buscaDetalhada',
                canActivate: [AuthGuard],
                component: BuscaDetalhadaComponent  
            },
            { 
                path: '',
                canActivate: [AuthGuard],
                component: HomeComponent 
            },
            { 
                path: 'form',
                canActivate: [AuthGuard],
                component: FormComponent 
            },
            { 
                path: 'form/:id',
                canActivate: [AuthGuard],
                component: FormComponent 
            },
        ]),
    ],
    exports: [
        RouterModule,
    ]
})

export class UsersModule { }