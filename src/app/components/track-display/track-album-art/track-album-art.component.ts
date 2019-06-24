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

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}

  getAlbumImageUrl(): string {
    return this.albumImageUrl;
  }
}
