import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasecomponentComponent } from './casecomponent/casecomponent.component';

const routes: Routes = [
  {
    path:"",
    component: CasecomponentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseRoutingModule { }
