import { TestBed } from '@angular/core/testing';

import { SpotifyPlayerService } from './spotify-player.service';

describe('SpotifyPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyPlayerService = TestBed.get(SpotifyPlayerService);
    expect(service).toBeTruthy();
  });
});
