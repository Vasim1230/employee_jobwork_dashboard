import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxtimelineComponent } from './ngxtimeline/ngxtimeline.component';

const routes: Routes = [
  {
    path: '',
    component: NgxtimelineComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxtimelineRoutingModule { }
