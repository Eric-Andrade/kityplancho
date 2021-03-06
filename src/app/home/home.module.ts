import { LoginComponent } from '../core/shell/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router/';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { LoginModule } from '../core/shell/login/login.module';
const routes: Routes = [
  { path: '', component: HomeComponent }
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
      LoginModule

  ],
  declarations: [HomeComponent, LoginComponent]
})
export class HomeModule { }
