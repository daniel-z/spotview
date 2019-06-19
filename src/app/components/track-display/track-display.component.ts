import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { get } from 'lodash';
import { PlayerState } from '../player/player.model';
import * as TrackDetails from './track-display.model';

@Component({
  selector: 'app-track-display',
  templateUrl: './track-display.component.html',
  styleUrls: ['./track-display.component.scss']
})
export class TrackDisplayComponent implements OnInit {
  @Input() trackDetails: TrackDetails.TrackDetailsInterface =
    TrackDetails.InitialTrackDetails;
  @Input() onTogglePlay: () => {};
  @Input() isPaused: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}

  getAlbumImageUrl(): string {
    const imageURl = get(this.trackDetails, 'album.albumImageUrl');
    return `url("${imageURl}")`;
  }
}
