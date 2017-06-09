import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
// import { MdInputModule } from '@angular/material';
// import { PedidosComponent } from './pedidos.component';
// import { PedidoComponent } from '../pedido/pedido.component';
// import { PedidodetalleComponent } from './pedidodetalle.component';
import { PedidosService } from './pedidos.service';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    FormsModule,
    HttpModule,
    SharedModule,
    Ng2FilterPipeModule
  ],
  declarations: [ ],
  providers: [ PedidosService ],
})
export class PedidosModule { }
