import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ServiciosComponent } from './servicios.component';
import { SharedModule } from '../shared/shared.module';
import { ServicioComponent } from './servicio/servicio.component';
import { RouterModule, Routes } from '@angular/router/';
import { ServiciosService } from './servicios.service';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';
import { ServiciodetalleComponent } from './serviciodetalle.component';
import { PrendasService } from './prendas/prendas.service';
import { PrendasComponent } from './prendas/prendas.component';
import { PrendadetalleComponent } from './prendas/prendadetalle.component';
import { PrendaComponent } from './prendas/prenda/prenda.component';
import { ServicioprendasComponent } from './servicioprendas.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

const routes: Routes = [
  { path: '', component: ServiciosComponent },
  { path: ':id', component: ServiciodetalleComponent },
  { path: 'servicio/:id', component: ServicioprendasComponent },
  { path: 'prenda/:id', component: PrendadetalleComponent }

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
  // tslint:disable-next-line:max-line-length
  declarations: [ServiciosComponent, ServicioComponent, ServiciodetalleComponent, PrendasComponent, PrendadetalleComponent, PrendaComponent, ServicioprendasComponent],
  providers: [ ServiciosService, PrendasService ]
})
export class ServiciosModule { }
