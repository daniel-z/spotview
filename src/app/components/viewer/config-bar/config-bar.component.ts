import { Component, OnInit } from '@angular/core';
import { ConfigBarStateInterface } from './config-bar.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/states/app.state';
import { selectViewerConfigState } from 'src/app/store/selectors';
import {
  ViewerConfigBarToggleAArtAction,
  ViewerConfigBarToggleAlwaysVisibleAArtAction,
  ViewerBGImageChangeAction
} from 'src/app/store/actions/viewer.actions';
import { BgImagesPool } from '../viewer.model';

@Component({
  selector: 'app-config-bar',
  templateUrl: './config-bar.component.html',
  styleUrls: ['./config-bar.component.scss']
})
export class ConfigBarComponent implements OnInit {
  configBarState: ConfigBarStateInterface;
  configBar$: Observable<ConfigBarStateInterface>;
  bgImageIndex = 0;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {
    this.store.select(selectViewerConfigState).subscribe(configBarState => {
      this.configBarState = configBarState;
    });
  }

  changeViewerBackground() {
    this.bgImageIndex = this.bgImageIndex + 1;
    if (this.bgImageIndex > BgImagesPool.length - 1) {
      this.bgImageIndex = 0;
    }
    const bgImage = BgImagesPool[this.bgImageIndex];
    this.store.dispatch(new ViewerBGImageChangeAction({ bgImage }));
  }

  toggleAlbumArtVisibility() {
    this.store.dispatch(
      new ViewerConfigBarToggleAlwaysVisibleAArtAction({
        albumArtAlwaysVisible: !this.configBarState.albumArtAlwaysVisible
      })
    );
  }

  toggleAlbumArt() {
    this.store.dispatch(
      new ViewerConfigBarToggleAArtAction({
        displayAlbumArt: !this.configBarState.displayAlbumArt
      })
    );
  }
}
