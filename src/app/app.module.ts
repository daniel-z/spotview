import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { TrackDisplayComponent } from './components/track-display/track-display.component';
import { AuthComponent } from './components/auth/auth.component';
import { TrackControlsComponent } from './components/track-display/track-controls/track-controls.component';
import { AppReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TrackAlbumArtComponent } from './components/track-display/track-album-art/track-album-art.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    TrackDisplayComponent,
    AuthComponent,
    TrackControlsComponent,
    TrackAlbumArtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(AppReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
