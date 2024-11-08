import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,AbstractControl} from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent  {
  addstudent!: FormGroup;
  submitted = false;
  constructor(private _fb:FormBuilder,private _stdservice:StudentService,private router: Router,private toastr:ToastrService){ 
    this.addstudent = this._fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z].*")]],
      age: ["",[Validators.required,Validators.pattern("[0-9].*"),Validators.maxLength(2)]],
      dob:["",[Validators.required]],
      bloodGroup:["",[Validators.required]],
      currentStd:["",[Validators.required]],
      fatherName:["",[Validators.required,Validators.pattern("[a-zA-Z].*")]],
      phoneNumber: ["",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9].*")]],
      address:["",[Validators.required]],
      
      joiningDate:["",[Validators.required]],
      joiningTime:["",[Validators.required]],
      gender:["",[Validators.required]],
  
  
  });
  }
  get f(): { 
    [key: string]: AbstractControl 
  } 
  {
    return this.addstudent.controls;
  }

 submitform(){
    this.submitted = true;
    if(this.addstudent.valid){
      this._stdservice.addstudent(this.addstudent.value).subscribe({
        next: (val:any) => {
          this.toastr.success("Saved successfully!");
          this.router.navigate(['/student']);
           console.log(val)
        
  
        },
        error:(err:any) => {
          this.toastr.error("error!");
          console.error(err);
        },
        
      });
      
    }
  
  }
  oncancle(){
  
    
    this.toastr.success("cancle successfully!");
    this.router.navigate(['/student']);
  }
  openaddstudent(){
    this.router.navigate(['/student']); 
   
  }
  
  } 