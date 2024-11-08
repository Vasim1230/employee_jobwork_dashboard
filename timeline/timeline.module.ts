import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline/timeline.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProjectmanageComponent } from './projectmanage/projectmanage.component';
import { UsertimesheetComponent } from './usertimesheet/usertimesheet.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimelineComponent,
    ProjectmanageComponent,
    UsertimesheetComponent
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    HighchartsChartModule,
    FormsModule,
  ]
})
export class TimelineModule { }
