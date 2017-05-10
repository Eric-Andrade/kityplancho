import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios.component';
import { RouterModule, Routes } from '@angular/router/';
import { ServiciosService } from './servicios.service';
import { MaterialModule } from '@angular/material';
import { ServicioComponent } from './servicio/servicio.component';

const routes: Routes = [
  { path: '', component: ServiciosComponent }
];

@NgModule({
  imports: [
  CommonModule,
  RouterModule.forChild(routes),
      MaterialModule.forRoot(),
  ],
  declarations: [ServiciosComponent, ServicioComponent],
  providers: [ ServiciosService],
})
export class ServiciosModule { }
