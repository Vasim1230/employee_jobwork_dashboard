import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,AbstractControl} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})

export class EditemployeeComponent implements OnInit{
editemployee!: FormGroup;
submitted = false;
name!:any;
constructor(private _fb:FormBuilder,private _empservice:EmployeeService,private route:ActivatedRoute,private router: Router,private toastr:ToastrService){ }
data:any
ngOnInit(): void {
  this.getById();
  this.name = this.route.snapshot.queryParams.empName;
  this.editemployee = this._fb.group({
    name:["",[Validators.required,Validators.pattern("[a-zA-Z].*")]],
    email:["",[Validators.required,Validators.email]],
    address:["",[Validators.required]],
    phoneNumber: ["",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9].*")]],
    city:["",[Validators.required,Validators.pattern("[a-zA-Z].*")]],
    state:["",[Validators.required]],
    zip:["",[Validators.required,Validators.pattern("[0-9].*")]],
    gender:["",[Validators.required]],

   
      });
            
}
 

 getById(){
   //console.log(this.route.snapshot.params.id);
  this._empservice.geteditaddemployeelist(this.route.snapshot.queryParams.empId).subscribe((result:any)=>{
 //console.log(result);
 if (result) {
  this.editemployee.patchValue({
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

  });
    

}


    
  

get f(): { 
  [key: string]: AbstractControl 
} 
{
  return this.editemployee.controls;
}

editaddemployeelist(){
  this.submitted = true;
  if(this.editemployee.invalid){
    this._empservice.addemployee("Enter Valid data!");
  
    return;
   
  }
 
this._empservice.editaddemployeelist(this.route.snapshot.queryParams.empId,this.editemployee.value).subscribe((result)=>{
      console.log(result);
      this.toastr.success("Updated successfully!");
      this.router.navigateByUrl("/employee");;
      
    })
      
    }
    openaddEmployee(){
      this.router.navigate(['/employee']); 
     
    }
  }
  
  





/*
submitform(){
  this.submitted=true;
  if (this.editemployee.valid) {
    this.toastr.error("Enter Valid data!");
    return;
  }
  this._empservice.editaddemployeelist(this.route.snapshot.queryParams.empId,this.editemployee.value).subscribe((result)=>{
    console.log(result);
   alert("Updated successfully!");
   this.toastr.success("Updated successfully!");
    
  })
  
  
 
 
}

  
  
}


*/