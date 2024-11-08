import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaugeRoutingModule } from './gauge-routing.module';
import { GaugeComponent } from './gauge/gauge.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    GaugeComponent
  ],
  imports: [
    CommonModule,
    GaugeRoutingModule,
    FormsModule, HighchartsChartModule
  ]
})
export class GaugeModule { }
