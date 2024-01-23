import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StatusFormComponent } from './status-form/status-form.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardComponent,
    StatusFormComponent
  ],
  exports: [
    StatusFormComponent
  ]
})
export class AdminModule { }
