import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WidgetsResponse } from '../services/casecomponent.model';
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class CasecomponentService {
  private apiUrl = 'http://localhost:3000/doc';


  constructor(private _http: HttpClient) { }
  getwidgets(): Observable<WidgetsResponse> {
    return this._http.get<WidgetsResponse>(this.apiUrl);
  }


}