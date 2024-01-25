import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StatusFormComponent } from './status-form/status-form.component';
import { CompanyService } from '../shared/services/company.service';

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
  ],
  providers: [
    CompanyService
  ]
})
export class AdminModule { }
