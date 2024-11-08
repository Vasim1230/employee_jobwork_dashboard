import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { MixedchartsComponent } from './mixedcharts/mixedcharts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MixedchartsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    MultiSelectModule,
    FormsModule,
  ]
})
export class DashboardModule { }
