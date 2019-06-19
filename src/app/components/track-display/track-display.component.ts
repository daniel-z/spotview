import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { get } from 'lodash';

export interface TrackDetails {
  trackName?: string;
  artistName?: string;
  album?: {
    albumImageUrl?: string;
    name: string;
  };
}

const defaultTrackBgImage =
  'https://images.unsplash.com/photo-1526121548504-55f319b740ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

@Component({
  selector: 'app-track-display',
  templateUrl: './track-display.component.html',
  styleUrls: ['./track-display.component.scss']
})
export class TrackDisplayComponent implements OnInit {
  @Input() trackDetails: TrackDetails = {};

  trackDefaults: TrackDetails = {
    trackName: '[No Track]',
    artistName: '[No Artist]',
    album: {
      albumImageUrl: defaultTrackBgImage,
      name: '[No Album]'
    }
  };

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.trackDetails =
      this.trackDetails && this.trackDetails.trackName
        ? this.trackDetails
        : this.trackDefaults;
  }

  getAlbumImageUrl(): string {
    const imageURl = get(this.trackDetails, 'album.albumImageUrl');
    return `url("${imageURl}")`;
  }
}
