import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { TrackDisplayComponent } from './components/track-display/track-display.component';
import { AuthComponent } from './components/auth/auth.component';
import { TrackControlsComponent } from './components/track-controls/track-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    TrackDisplayComponent,
    AuthComponent,
    TrackControlsComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
