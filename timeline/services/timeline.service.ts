import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {TimelineResponse } from '../timeline/timelineservices/timeline.model';
@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private apiUrl = 'http://localhost:3000/timeline';

  constructor(private _http: HttpClient) { }

  getTimelineData(): Observable<TimelineResponse> {
    return this._http.get<TimelineResponse>(this.apiUrl);
  }
}


