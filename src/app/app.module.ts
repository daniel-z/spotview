import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ViewerComponent} from './components/viewer/viewer.component';
import { TrackDisplayComponent } from './components/track-display/track-display.component';

@NgModule({
  declarations: [
    AppComponent, ViewerComponent, TrackDisplayComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}