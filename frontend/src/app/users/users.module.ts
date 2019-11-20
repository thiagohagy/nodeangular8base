import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

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
        RouterModule,
        NgxPaginationModule,
    ],
    exports: [
        HomeComponent,
        FormComponent,
        BuscaDetalhadaComponent,
    ]
})

export class UsersModule { }