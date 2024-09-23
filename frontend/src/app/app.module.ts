
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton,
    AppComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: []
})
export class AppModule { }
