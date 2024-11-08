import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MytaskComponent } from './mytask/mytask.component';

const routes: Routes = [
  {
  path: '',
  component: MytaskComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MytaskRoutingModule { }
