import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import{ AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: "addemployee",
    component: AddemployeeComponent
  },
  {
    path: "editemployee",
    component: EditemployeeComponent
  },
  {
    path: 'viewemployee',
    component: ViewemployeeComponent,
  },
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
