import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPipe } from "../pipes/password.pipe";
import { FilterPipe } from "../pipes/filter.pipe";


@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [
    TruncatePipe, CapitalizePipe, FilterPipe, PasswordPipe
  ],
  exports: [
    TruncatePipe, CapitalizePipe, FilterPipe, PasswordPipe
  ]
})
export class SharedModule { }
