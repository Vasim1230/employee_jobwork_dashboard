import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceResponse } from '../services/invoicechart.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicechartService {
  private apiUrl = 'http://localhost:3000/invoicechart';

  constructor(private _http: HttpClient) { }

  getwidgets(): Observable<InvoiceResponse> {
    return this._http.get<InvoiceResponse>(this.apiUrl);
  }
}


