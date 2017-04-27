import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios.component';
import { RouterModule, Routes } from '@angular/router/';
import { ServiciosService } from './servicios.service';
import { MaterialModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: ServiciosComponent }
];

@NgModule({
  imports: [
  CommonModule,
  RouterModule.forChild(routes),
      MaterialModule.forRoot(),
  ],
  declarations: [ServiciosComponent],
  providers: [ ServiciosService],
})
export class ServiciosModule { }
