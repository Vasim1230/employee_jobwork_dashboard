import { Component } from '@angular/core';

import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent  {
  submitted = false;
  employee = {
    name: '',
    email: '',
    city: '',
    phoneNumber: '',
    state: '',
    zip: '',
    gender: '',
    address: ''
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _empService: EmployeeService // Inject the service
  ) {}

submitForm(){
  this.submitted = true;
  
  if (this.employee.name && this.employee.email && this.employee.city && this.employee.phoneNumber &&
    this.employee.state && this.employee.zip && this.employee.gender && this.employee.address 
    ) {
  
    this._empService.addemployee(this.employee).subscribe({
      next: (val:any) => {
        this.toastr.success("Saved successfully!");
        this.router.navigate(['/employee']);
         console.log(val)
      

      },
      error:(err:any) => {
        this.toastr.error("error!");
        console.error(err);
      ; 
      },
      
    });
    
  }

}
oncancle(){

  
  this.toastr.success("cancle successfully!");
  this.router.navigate(['/employee']);
}
openaddEmployee(){
  this.router.navigate(['/employee']); 
 
}

}
 