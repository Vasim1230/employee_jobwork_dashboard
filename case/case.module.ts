import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseRoutingModule } from './case-routing.module';
import { CasecomponentComponent } from './casecomponent/casecomponent.component';
import { TabViewModule } from 'primeng/tabview';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CasecomponentComponent
  ],
  imports: [
    CommonModule,
    CaseRoutingModule,
    TabViewModule,
    NgSelectModule,
    FormsModule 
  ]
})
export class CaseModule { }
