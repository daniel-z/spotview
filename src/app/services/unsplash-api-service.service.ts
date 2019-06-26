import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UnsplashImageInterface } from '../models/unsplash-image';

@Injectable({
  providedIn: 'root'
})
export class UnsplashApiService {
  unsplashApi = environment.unsplash;

  constructor(private http: HttpClient) {}

  getCollection(): Observable<UnsplashImageInterface[]> {
    return this.http.get<UnsplashImageInterface[]>(
      `${this.unsplashApi.baseUrl}${
        this.unsplashApi.endpoints.collection
      }/217461`
    );
  }
}
