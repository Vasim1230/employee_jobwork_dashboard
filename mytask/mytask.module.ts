import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MytaskRoutingModule } from './mytask-routing.module';
import { MytaskComponent } from './mytask/mytask.component';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DragDropModule } from 'primeng/dragdrop';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    MytaskComponent
  ],
  imports: [
    CommonModule,
    MytaskRoutingModule,
    CardModule,
    ChipModule,
    ButtonModule,
    SkeletonModule,
    DragDropModule,
    ImageModule,
    DialogModule,

  ]
})
export class MytaskModule { }
