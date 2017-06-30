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
// import { Ng2UploaderModule } from 'ng2-uploader';
import { DataTablePipe } from '../pipes/data-table-pipe.pipe';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

import { SharedModule } from '../shared/shared.module';
import { LoginModule } from './shell/login/login.module';
import { PedidosModule } from './shell/pedidos/pedidos.module';

import { ShellComponent } from './shell/shell.component';
import { IndexComponent} from './shell/index/index.component';
import { MapaComponent } from './shell/mapa/mapa.component';
import { PedidosComponent } from './shell/pedidos/pedidos.component';
import { PedidoComponent } from './shell/pedido/pedido.component';
import { PedidodetalleComponent } from './shell/pedidos/pedidodetalle.component';
import { AcercaComponent } from './shell/acerca.component';

import { PedidosService } from './shell/pedidos/pedidos.service';
import { ClientesService } from '../clientes/clientes.service';
import { EmpleadosService } from '../empleados/empleados.service';
import { PerfilService } from "../perfil/perfil.service";
import { PedidoService } from "../core/shell/pedido/pedido.service";
import { LoginService } from '../core/shell/login/login.service';
import { AuthguardGuard } from "./shell/login/authguard.guard";

const routes: Routes = [
  { path: '', loadChildren: './../home/home.module#HomeModule' },
  { path: 'ayuda', canActivate:[AuthguardGuard], loadChildren: './../ayuda/ayuda.module#AyudaModule' },
  { path: 'clientes', canActivate:[AuthguardGuard], loadChildren: './../clientes/clientes.module#ClientesModule' },
  { path: 'empleados', canActivate:[AuthguardGuard], loadChildren: './../empleados/empleados.module#EmpleadosModule' },
  { path: 'servicios', canActivate:[AuthguardGuard], loadChildren: './../servicios/servicios.module#ServiciosModule' },
  { path: 'perfil', canActivate:[AuthguardGuard], loadChildren: './../perfil/perfil.module#PerfilModule' },
  { path: 'sucursales', canActivate:[AuthguardGuard], loadChildren: './../sucursales/sucursales.module#SucursalesModule' },
  { path: 'sucursales', canActivate:[AuthguardGuard], loadChildren: './../sucursales/sucursales.module#SucursalesModule' },
  { path: 'pedidos', canActivate:[AuthguardGuard], component: PedidosComponent },
  { path: 'pedidos/:id', canActivate:[AuthguardGuard], component: PedidodetalleComponent },
  { path: 'acerca', canActivate:[AuthguardGuard], component: AcercaComponent },
  { path: '**', loadChildren: './../home/home.module#HomeModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LoginModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA75BNrlsfPZykHOb0UcQuMcc2fJFR0bxI'
    }),
      Md2Module.forRoot(),
      BrowserAnimationsModule,
      HttpModule,
      Ng2FilterPipeModule,
      PedidosModule,

  ],
  declarations: [ ShellComponent, IndexComponent, PedidosComponent, MapaComponent, PedidoComponent, PedidodetalleComponent, AcercaComponent, DataTablePipe ],
  exports: [ ShellComponent, SharedModule, LoginModule, AgmCoreModule],
  providers: [ PedidosService, ClientesService, EmpleadosService, PerfilService, PedidoService, LoginService, AuthguardGuard ]
})
export class CoreModule { }
