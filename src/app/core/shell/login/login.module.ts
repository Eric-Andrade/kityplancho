import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule } from '@angular/http';
import { LoginService } from './login.service';


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
  ],
  declarations: [],
  providers:[ LoginService ]
})
export class LoginModule { }
