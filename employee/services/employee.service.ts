import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addemployee(employee: any) {
    return this._http.post('http://localhost:3000/employee ',employee);
   
  }
 
  getaddemployeelist() {
    return this._http.get('http://localhost:3000/employee ');
   
  }
  geteditaddemployeelist(id:any) {
    return this._http.get(`http://localhost:3000/employee/${id}`);
   
  }
  editaddemployeelist(id:number,data:any) {
    return this._http.put(`http://localhost:3000/employee/${id}`,data);
  
  
   

  }
  deleteemployee(id:any){
    return this._http.delete(`http://localhost:3000/employee/${id}`);
   
     }
     viewemployeedetails(id:number,data:any){
      return this._http.get(`http://localhost:3000/employee/${id}`,data);
     }
}
