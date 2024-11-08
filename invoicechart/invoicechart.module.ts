import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicechartRoutingModule } from './invoicechart-routing.module';
import { InvoicechartComponent } from './invoicechart/invoicechart.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    InvoicechartComponent
  ],
  imports: [
    CommonModule,
    InvoicechartRoutingModule,
    NgApexchartsModule
  ]
})
export class InvoicechartModule { }
