import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HumanComponent } from './human/human.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HumanComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
