import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicechartComponent } from './invoicechart/invoicechart.component';


const routes: Routes = [
  {
    path: '',
    component: InvoicechartComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicechartRoutingModule { }
