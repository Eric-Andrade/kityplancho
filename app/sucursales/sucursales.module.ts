import { SucursaldetalleComponent } from './sucursaldetalle.component';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { SucursalesComponent } from './sucursales.component';
import { SucursalesService } from "./sucursales.service";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { SucursalComponent } from './sucursal/sucursal.component';


const routes: Routes = [
  { path: '', component: SucursalesComponent }
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
  AgmCoreModule
  ],
  declarations: [SucursalesComponent, SucursalComponent, SucursaldetalleComponent],
  providers: [ SucursalesService],
})
export class SucursalesModule { }
