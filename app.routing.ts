import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

export const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home"
    },
    children: [
      {
        path: "sample",
        loadChildren: () =>
          import("./module/sample/sample.module").then(m => m.SampleModule)
      },
      {
        path: "user-application",
        loadChildren: () =>
          import("./module/user/user.module").then(m => m.UserModule)
      },
      {
        path: "employee",
        loadChildren: () =>
          import("./module/employee/employee.module").then(m => m.EmployeeModule)
      },
      {
        path: "student",
        loadChildren: () =>
          import("./module/student/student.module").then(m => m.StudentModule)
      },
      {
        path: "timeline",
        loadChildren: () =>
          import("./module/timeline/timeline.module").then(m => m.TimelineModule)
      },
      {
        path: "projectmanage",
        loadChildren: () =>
          import("./module/timeline/timeline.module").then(m => m.TimelineModule)
      },
      {
        path: "usertimesheet",
        loadChildren: () =>
          import("./module/timeline/timeline.module").then(m => m.TimelineModule)
      },
      {
        path: "mytask",
        loadChildren: () =>
          import("./module/mytask/mytask.module").then(m =>  m.MytaskModule)
          
      },
      {
        path: "ngxtimeline",
        loadChildren: () =>
          import("./module/ngxtimeline/ngxtimeline.module").then(m =>  m.NgxtimelineModule)
          
      },
      {
        path: "gauge",
        loadChildren: () =>
          import("./module/gauge/gauge.module").then(m =>  m.GaugeModule)
          
      },
      {
        path: "invoicechart",
        loadChildren: () =>
          import("./module/invoicechart/invoicechart.module").then(m =>  m.InvoicechartModule)
          
      },
      {
        path: "basictimesheet",
        loadChildren: () =>
          import("./module/student/student.module").then(m => m.StudentModule)
          
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./module/dashboard/dashboard.module").then(m => m.DashboardModule)
          
      },
      {
        path: "case",
        loadChildren: () =>
          import("./module/case/case.module").then(m => m.CaseModule)
          
      },
      {
        path: "fullcalendar",
        loadChildren: () =>
          import("./module/fullcalendar/fullcalendar.module").then(m => m.FullcalendarModule)
          
      },
      
     

/*
       { 
       path:"grid",
       loadChildren:() =>
          import("./module/grid/grid.module").then(m => m.GridModule)
       },
       {
         path:"coupon",
         loadChildren:()=>
         import("./module/coupon/coupon.module").then(m =>m.CouponModule)
       },
      {
        path:"payment",
        loadChildren:() =>
        import("./module/payment/payment.module").then(m => m.PaymentModule)
      },
      {
        path:"job",
        loadChildren:()=>
        import("./module/jobopening/job.module").then(m => m.JobModule)
      },
      {
        path:"address",
        loadChildren:()=>
        import("./module/address/address.module").then(m =>m.AddressModule)
      },
      {
        path:"sale",
        loadChildren:()=>
        import("./module/sale/sale.module").then(m => m.SaleModule)
      },
      {
        path:"order",
        loadChildren:()=>
        import("./module/order/order.module").then(m => m.OrderModule)
      },
*/
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
