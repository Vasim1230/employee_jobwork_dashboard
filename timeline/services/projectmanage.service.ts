import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  ProjectmanageResponse } from '../projectmanage/services/projectmanage.model';



@Injectable({
  providedIn: 'root'
})
export class ProjectmanageService {

  private apiUrl = 'http://localhost:3000/projectman';

  constructor(private _http: HttpClient) { }

  getTimelineData(): Observable<ProjectmanageResponse> {
    return this._http.get<ProjectmanageResponse>(this.apiUrl);
  }
}

