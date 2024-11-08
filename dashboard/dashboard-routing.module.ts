import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MixedchartsComponent } from './mixedcharts/mixedcharts.component';

const routes: Routes = [
  {
    path:"",
    component: DashboardComponent
    },
    {
      path:"mixedcharts",
      component: MixedchartsComponent
      }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
