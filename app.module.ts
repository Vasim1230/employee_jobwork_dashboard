import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// @ts-ignore TS6133
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// import { AngularSlickgridModule } from 'angular-slickgrid'; 
// import { GridContentComponent } from './module/grid/grid-content/grid-content.component';


// @ts-ignore TS6133
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [DefaultLayoutComponent];

import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
// Import 3rd party components
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import {SkeletonModule} from 'primeng/skeleton';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TokenGenerationListComponent } from './module/token-generation-list/token-generation-list.component';
import { TokenGenerationAddComponent } from './module/token-generation-add/token-generation-add.component';




/*
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from './module/grid/grid.module';
import { CouponModule } from './module/coupon/coupon.module';
import { PaymentModule } from './module/payment/payment.module';
import { JobModule } from './module/jobopening/job.module';
import { AddressModule } from './module/address/address.module';
import { SaleModule } from './module/sale/sale.module';
import { OrderModule } from './module/order/order.module';
*/


// import { AddComponent } from './grid-content/add/add.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SkeletonModule,
    DragDropModule,
    CardModule,
    ChipModule,
  
    
    
/*
    ReactiveFormsModule,
    GridModule,
    CouponModule,
    PaymentModule,
    JobModule,
    ToastrModule.forRoot(),
    AddressModule,
    SaleModule,
    OrderModule,
*/
    
    
    // AngularSlickgridModule.forRoot(),
   

    HttpClientModule,
    ModalModule.forRoot()
  ],
  declarations: [AppComponent, ...APP_CONTAINERS, TokenGenerationListComponent, TokenGenerationAddComponent, ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
