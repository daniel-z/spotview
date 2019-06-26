import { Component, OnInit } from '@angular/core';
import { ConfigBarStateInterface } from './config-bar.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/states/app.state';
import {
  selectViewerConfigState,
  selectViewerState
} from 'src/app/store/selectors';
import {
  ViewerConfigBarToggleAArtAction,
  ViewerConfigBarToggleAlwaysVisibleAArtAction,
  ViewerBGImageChangeAction
} from 'src/app/store/actions/viewer.actions';
import { ViewerStateInterface } from '../viewer.model';

@Component({
  selector: 'app-config-bar',
  templateUrl: './config-bar.component.html',
  styleUrls: ['./config-bar.component.scss']
})
export class ConfigBarComponent implements OnInit {
  configBarState: ConfigBarStateInterface;
  configBar$: Observable<ConfigBarStateInterface>;
  bgImageIndex: ViewerStateInterface['bgImageIdx'];
  BgImagesPool: ViewerStateInterface['bgImagePool'];
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {
    this.store.select(selectViewerConfigState).subscribe(configBarState => {
      this.configBarState = configBarState;
    });

    this.store.select(selectViewerState).subscribe(viewerState => {
      this.BgImagesPool = viewerState.bgImagePool;
      this.bgImageIndex = viewerState.bgImageIdx;
    });
  }

  changeViewerBackground() {
    let newBgImageIndex = this.bgImageIndex + 1;
    if (newBgImageIndex > this.BgImagesPool.length - 1) {
      newBgImageIndex = 0;
    }
    this.store.dispatch(
      new ViewerBGImageChangeAction({ bgImageIdx: newBgImageIndex })
    );
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
