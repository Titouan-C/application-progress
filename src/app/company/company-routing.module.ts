import { Component, Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  { path: 'edit/:id', component: CompanyFormComponent },
  { path: 'list', component: CompanyListComponent },
  { path: ':id', component: CompanyFormComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]


  




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
