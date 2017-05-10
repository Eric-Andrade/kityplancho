import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { MdInputModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
      MdInputModule,
      SharedModule
  ],
  exports: [ MdInputModule ]

})
export class PedidosModule { }
