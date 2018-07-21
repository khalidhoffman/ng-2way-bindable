import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppComponent }       from './app.component';
import { SecondaryComponent } from './secondary/secondary.component';

@NgModule({
  declarations: [
    AppComponent,
    SecondaryComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppComponent,
    SecondaryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
