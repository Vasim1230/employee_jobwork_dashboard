import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  //router function call in angular
  employee: any[]=[];
 /* employeelist:any[]=[]*/
  constructor(private router: Router,private _empservice:EmployeeService,private toastr:ToastrService) { } 
  
  ngOnInit():void{
   
  
    this.getaddemployeelist();
    
   }
   
  openaddEmployee(){
    this.router.navigate(['employee/addemployee']); 
   
  }
    

  getaddemployeelist(){
   
    this._empservice.getaddemployeelist().subscribe({
      next: (res: any) => {
        console.log(res);
        this.employee=res;
       
      },
      error: console.log
   
      
    
      })
    }
    openeditemployee(id:any,name:any){
      this.router.navigate(['employee/editemployee'],
        {queryParams:{empId: id,empName: name}}
       
      
      ); 
     

    } 
   
    deleteemployee(id:any){
      
      this._empservice.deleteemployee(id).subscribe((result:any)=>{
      
        console.log(result);
        this.ngOnInit();
        this._empservice.addemployee("Deleted successfully!");
        this.toastr.success("Deleted successfully!");
        this.getaddemployeelist();
      })
    }
    
      viewemployee(id:any,name:any){
        this.router.navigate(['employee/viewemployee'],
          {queryParams:{empId: id,empName:name}}
      ); 
    }

    
}
/*
editemployee(id : any){
  this.router.navigate([`employee/editemployee/${id}`]); 
}
   }
    
      viewemployee(id: any){
        this.router.navigate([`employee/viewemployee/${id}`],
         
      ); 
    } */

