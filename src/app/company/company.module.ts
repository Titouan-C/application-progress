import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../shared/services/company.service';
import { StatusDirective } from './status.directive';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [
    CompanyFormComponent,
    CompanyListComponent,
    StatusDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ],
  exports: [
    CompanyFormComponent,
    CompanyListComponent
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule { }
