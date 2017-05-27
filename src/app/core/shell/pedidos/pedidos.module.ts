import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MdInputModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
// import { PedidosComponent } from './pedidos.component';
// import { PedidoComponent } from '../pedido/pedido.component';
// import { PedidodetalleComponent } from './pedidodetalle.component';
import { PedidosService } from './pedidos.service';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    FormsModule,
    HttpModule,
    SharedModule
  ],
  declarations: [ ],
  providers: [ PedidosService ],
})
export class PedidosModule { }
