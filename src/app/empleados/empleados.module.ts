import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados.component';
import { SharedModule } from '../shared/shared.module';
import { EmpleadoComponent } from './empleado/empleado.component';
import { RouterModule, Routes } from '@angular/router/';
import { EmpleadosService } from './empleados.service';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';
import { EmpleadoDetalleComponent } from './empleadodetalle.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

const routes: Routes = [
  { path: '', component: EmpleadosComponent },
  { path: ':id', component: EmpleadoDetalleComponent }
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
  declarations: [ EmpleadosComponent, EmpleadoComponent, EmpleadoDetalleComponent ],
  providers: [ EmpleadosService ],
})
export class EmpleadosModule { }
