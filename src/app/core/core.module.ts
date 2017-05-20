import { COMPONENT_VARIABLE } from '@angular/platform-browser/src/dom/dom_renderer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Md2Module } from 'md2';
import { MaterialModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';

import { ShellComponent } from './shell/shell.component';
import { IndexComponent} from './shell/index/index.component';
import { SharedModule } from 'app/shared/shared.module';
import { PedidosComponent } from './shell/pedidos/pedidos.component';
import { MapaComponent } from './shell/mapa/mapa.component';
import { PedidoComponent } from './shell/pedido/pedido.component';

import { PedidosService } from './shell/pedidos/pedidos.service';
import { ClientesService } from '../clientes/clientes.service';
import { EmpleadosService } from '../empleados/empleados.service';
import { PerfilService } from "app/perfil/perfil.service";
import { PedidoService } from "app/core/shell/pedido/pedido.service";

const routes: Routes = [
  { path: '', loadChildren: './../home/home.module#HomeModule' },
  { path: 'ayuda', loadChildren: './../ayuda/ayuda.module#AyudaModule' },
  { path: 'clientes', loadChildren: './../clientes/clientes.module#ClientesModule' },
  { path: 'empleados', loadChildren: './../empleados/empleados.module#EmpleadosModule' },
  { path: 'servicios', loadChildren: './../servicios/servicios.module#ServiciosModule' },
  { path: 'perfil', loadChildren: './../perfil/perfil.module#PerfilModule' },
  { path: 'sucursales', loadChildren: './../sucursales/sucursales.module#SucursalesModule' },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', loadChildren: './../home/home.module#HomeModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA75BNrlsfPZykHOb0UcQuMcc2fJFR0bxI'
    }),
      Md2Module.forRoot(),
      BrowserAnimationsModule,
      HttpModule,
      Ng2UploaderModule

  ],
  declarations: [ShellComponent, IndexComponent, PedidosComponent, MapaComponent, PedidoComponent ],
  exports: [ShellComponent, SharedModule],
  providers: [ PedidosService, ClientesService, EmpleadosService, PerfilService, PedidoService ]
})
export class CoreModule { }
