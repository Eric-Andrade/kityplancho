import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  // { path: '', component: ClientesComponent },
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
  declarations: [LoginComponent]
})
export class LoginModule { }
