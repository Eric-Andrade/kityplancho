import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios.component';
import { ServicioComponent } from './servicio/servicio.component';
import { RouterModule, Routes } from '@angular/router/';
import { ServiciosService } from './servicios.service';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '', component: ServiciosComponent }

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
  declarations: [ServiciosComponent, ServicioComponent],
  providers: [ ServiciosService]
})
export class ServiciosModule { }
