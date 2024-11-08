import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxtimelineRoutingModule } from './ngxtimeline-routing.module';
import { NgxtimelineComponent } from './ngxtimeline/ngxtimeline.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    NgxtimelineComponent,
   
  ],
  imports: [
    CommonModule,
    NgxtimelineRoutingModule,
    FormsModule,
    NgApexchartsModule,
  ]
})
export class NgxtimelineModule { }
