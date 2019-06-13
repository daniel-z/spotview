import { Component } from '@angular/core';
import { SpotPlayer } from './scripts/spotplayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotyview';
  player: any;
  constructor() {
    // tslint:disable-next-line: max-line-length
    const token = 'BQAow798L-CtwlDNlkcKcaHpnLXrGOY0QsQK4V5iRUVtT_qoT_tg4-67vObSg_dQxmqHHZt7qR3N1m8B25H8uCJ84O-lDw_3VUvxUHbvYIE6hlm3Gcq62vJ4HmThr27ccP4s_PQ0do56lTngMzDny1qQ3rZKCASO34db1Q';
    this.player = new SpotPlayer(token, 'Spot Player', window);
  }
}
