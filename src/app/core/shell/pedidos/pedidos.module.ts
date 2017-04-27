import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
      MdInputModule
  ],
  exports: [ MdInputModule ]

})
export class PedidosModule { }
