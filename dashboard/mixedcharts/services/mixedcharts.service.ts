import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WidgetResponse } from '../services/mixedcharts.model';

@Injectable({
  providedIn: 'root'
})
export class MixedchartsService {
  private apiUrl = 'http://localhost:3000/mixedcharts';
  constructor(private _http: HttpClient) { }
  getwidgets(): Observable<WidgetResponse> {
    return this._http.get<WidgetResponse>(this.apiUrl);
  }
}



