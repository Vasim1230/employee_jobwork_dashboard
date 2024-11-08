import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GaugeResponse} from './gauge.model';
@Injectable({
  providedIn: 'root'
})
export class GaugeService {
 
  private apiUrl = 'http://localhost:3000/gauge';

  constructor(private _http: HttpClient) { }

  getGaugeData(): Observable<GaugeResponse> {
    return this._http.get<GaugeResponse>(this.apiUrl);
  }
}
