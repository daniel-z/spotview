import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track-controls',
  templateUrl: './track-controls.component.html',
  styleUrls: ['./track-controls.component.scss']
})
export class TrackControlsComponent implements OnInit {
  @Input() onTogglePlay: () => {};
  @Input() isPaused: boolean;

  constructor() {}

  ngOnInit() {}
}
