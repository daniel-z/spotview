import { Component, OnInit } from '@angular/core';
import { ConfigBarStateInterface } from './config-bar.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/states/app.state';
import { selectViewerConfigState } from 'src/app/store/selectors';

@Component({
  selector: 'app-config-bar',
  templateUrl: './config-bar.component.html',
  styleUrls: ['./config-bar.component.scss']
})
export class ConfigBarComponent implements OnInit {
  configBarState: ConfigBarStateInterface;
  configBar$: Observable<ConfigBarStateInterface>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {
    this.configBar$ = this.store.select(selectViewerConfigState);
    this.configBar$.subscribe(configBarState => {
      this.configBarState = configBarState;
    });
  }
}
