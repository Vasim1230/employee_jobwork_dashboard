import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WidgetsResponse } from '../services/basictimesheet.model';
@Injectable({
  providedIn: 'root'
})


export class BasictimesheetService {






  private apiUrl = 'http://localhost:3000/basictimesheet';

  constructor(private _http: HttpClient) { }

  getwidgets(): Observable<WidgetsResponse> {
    return this._http.get<WidgetsResponse>(this.apiUrl);
  }
}