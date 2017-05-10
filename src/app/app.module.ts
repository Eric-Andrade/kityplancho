import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { ShellComponent } from './core/shell/shell.component';


@NgModule({
  declarations: [ ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule { }
