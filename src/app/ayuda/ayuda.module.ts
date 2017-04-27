import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AyudaComponent } from './ayuda.component';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';

const routes: Routes = [
  { path: '', component: AyudaComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
  ],
  declarations: [AyudaComponent]
})
export class AyudaModule { }
