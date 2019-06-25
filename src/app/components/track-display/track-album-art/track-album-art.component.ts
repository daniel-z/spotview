import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { get } from 'lodash';
import { PlayerStateInterface } from '../../player/player.model';
import * as TrackDisplay from '../track-display.model';

@Component({
  selector: 'app-track-album-art',
  templateUrl: './track-album-art.component.html',
  styleUrls: ['./track-album-art.component.scss']
})
export class TrackAlbumArtComponent implements OnInit {
  @Input() albumImageUrl: string;
  @Input() albumArtAlwaysVisible: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}

  isAlbumArtAlwaysVisible(): string {
    return this.albumArtAlwaysVisible ? 'always-visible' : '';
  }

  getAlbumImageUrl(): string {
    return this.albumImageUrl;
  }
}
