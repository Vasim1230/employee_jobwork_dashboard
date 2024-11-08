import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    EmployeeComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    ViewemployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    PaginatorModule,
  ]
})
export class EmployeeModule { }
