import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.scss']
})
export class ViewemployeeComponent implements OnInit {
  viewemployee!:FormGroup;
  constructor(private _fb:FormBuilder,private _empservice:EmployeeService,private route:ActivatedRoute,private router: Router,private toastr:ToastrService){ }
  data:any;
  ngOnInit(): void {
    this.getById();
    this._empservice.geteditaddemployeelist(this.route.snapshot.queryParams.name)
    this.viewemployee = this._fb.group({
      name:[""],
      email:[""],
      address:[""],
      phoneNumber: [""],
      city:[""],
      state:[""],
      zip:[""],
      gender:[""],
  
     
        });
            
  }
   getById(){
    
      //console.log(this.route.snapshot.params.id);
     this._empservice.geteditaddemployeelist(this.route.snapshot.queryParams.empId).subscribe((result:any)=>{
    //console.log(result);
    if (result) {
     this.viewemployee.patchValue({
       name: result.name,
       email: result.email,
       address: result.address,
       phoneNumber: result.phoneNumber,
       city: result.city,
       state: result.state,
       zip: result.zip,
       gender: result.gender,
     });
   }
   this._empservice.viewemployeedetails(this.route.snapshot.queryParams.empId,this.viewemployee.value).subscribe((result)=>{
    console.log(result);
    this.toastr.success("view page!");
    
  });
     });
       
   
   }
   openaddEmployee(){
    this.router.navigate(['/employee']); 
   
  }
   
}
   

  