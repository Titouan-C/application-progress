import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from './company.service';

@NgModule({
  declarations: [
    CompanyFormComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
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
