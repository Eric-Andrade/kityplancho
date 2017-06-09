import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { PedidodetalleComponent } from './pedidodetalle.component';
import { PedidosComponent } from './pedidos.component';
import { PedidosService } from './pedidos.service';

const routes: Routes = [
  { path: '', component: PedidosComponent },
  { path: 'pedidos/:id', component: PedidodetalleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
      MaterialModule.forRoot(),
      Md2Module.forRoot(),
      FormsModule,
      HttpModule,
      SharedModule
  ],
  declarations: [ PedidosComponent, PedidodetalleComponent ],
  providers: [ PedidosService ],
})
export class PedidosModule { }
