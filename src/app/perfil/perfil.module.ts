import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';
import { RouterModule, Routes } from '@angular/router/';
import { PerfilService } from "./perfil.service";

const routes: Routes = [
  { path: '', component: PerfilComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
      MaterialModule.forRoot(),
      Md2Module.forRoot(),
      FormsModule,
      HttpModule,
  ],
  declarations: [PerfilComponent],
  providers: [ PerfilService ]
})
export class PerfilModule { }
