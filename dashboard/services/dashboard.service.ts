import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WidgetsResponse } from '../services/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard';

  constructor(private _http: HttpClient) { }

  getwidgets(): Observable<WidgetsResponse> {
    return this._http.get<WidgetsResponse>(this.apiUrl);
  }
}

