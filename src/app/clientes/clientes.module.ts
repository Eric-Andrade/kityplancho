import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { RouterModule, Routes } from '@angular/router/';
import { ClientesService } from './clientes.service';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { ClienteDetalleComponent } from "./clientedetalle.component";
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: ':id', component: ClienteDetalleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
      MaterialModule.forRoot(),
      Md2Module.forRoot(),
      FormsModule,
      HttpModule,
      SharedModule,
      Ng2FilterPipeModule
  ],
  declarations: [ ClientesComponent, ClienteComponent, ClienteDetalleComponent],
  providers: [ ClientesService ]
})
export class ClientesModule { }
