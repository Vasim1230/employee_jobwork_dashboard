import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectmanageComponent } from './projectmanage/projectmanage.component';
import { UsertimesheetComponent } from './usertimesheet/usertimesheet.component';

const routes: Routes = [
  {
    path: '',
    component: TimelineComponent
  },
  {
    path: 'projectmanage',
    component: ProjectmanageComponent
  },
  {
    path: 'usertimesheet',
    component: UsertimesheetComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
