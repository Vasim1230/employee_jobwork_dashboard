import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsertimesheetResponse } from './usertimesheet.model';

@Injectable({
  providedIn: 'root'
})
export class UsertimesheetService {
  
  private apiUrl = 'http://localhost:3000/usertimesheet';

  constructor(private http: HttpClient) { }

 
  getUserTimesheetByWeek(): Observable<UsertimesheetResponse> {
   
    const url = `${this.apiUrl}`;
    
   
    return this.http.get<UsertimesheetResponse>(url);
  }

 
  getUserTimesheetByDate(): Observable<UsertimesheetResponse> {
    const url = `${this.apiUrl}`;
    
   
    return this.http.get<UsertimesheetResponse>(url);
    
    
  }
  getUserTimesheetByMonth(): Observable<UsertimesheetResponse> {
    const url = `${this.apiUrl}`;
    
   
    return this.http.get<UsertimesheetResponse>(url);
    
}
}
