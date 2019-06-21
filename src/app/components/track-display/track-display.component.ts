import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { get } from 'lodash';
import { PlayerStateInterface } from '../player/player.model';
import * as TrackDisplay from './track-display.model';

@Component({
  selector: 'app-track-display',
  templateUrl: './track-display.component.html',
  styleUrls: ['./track-display.component.scss']
})
export class TrackDisplayComponent implements OnInit {
  @Input() trackDisplayData: TrackDisplay.TrackDisplayInterface =
    TrackDisplay.InitialTrackDisplayState;
  @Input() onTogglePlay: () => {};
  @Input() isPaused: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('TrackDisplayComponent', this.trackDisplayData);
  }

  getAlbumImageUrl(): string {
    const imageURl = get(this.trackDisplayData, 'album.albumImageUrl');
    return `url("${imageURl}")`;
  }
}
