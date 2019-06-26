import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UnsplashApiService } from '../../services/unsplash-api-service.service';
import {
  ViewerBGImagePoolLoadSuccessAction,
  ViewerActions
} from '../actions/viewer.actions';
import { Action } from '@ngrx/store';
import { ViewerStateInterface } from '../states/viewer.state';

@Injectable()
export class ViewerEffects {
  constructor(
    private actions$: Actions,
    private unsplashService: UnsplashApiService
  ) {}

  @Effect()
  loadBgImages$: Observable<Action> = this.actions$.pipe(
    ofType(ViewerActions.VIEWER_BGIMAGEPOOL_LOAD),
    switchMap((actionData: { type: string; payload: string }) => {
      return this.unsplashService.getCollection(actionData.payload).pipe(
        map((data: ViewerStateInterface['bgImagePool']) => {
          return new ViewerBGImagePoolLoadSuccessAction({
            bgImagePool: data
          });
        })
      );
    })
  );
}
