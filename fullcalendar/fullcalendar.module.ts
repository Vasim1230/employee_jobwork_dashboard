import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';

import { FullcalendarRoutingModule } from './fullcalendar-routing.module';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    FullcalendarComponent
  ],
  imports: [
    CommonModule,
    FullcalendarRoutingModule,
    FormsModule,
   
    FullCalendarModule
  ]
})
export class FullcalendarModule { }
