import { Routes } from '@angular/router';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { CompanyListComponent } from './company/company-list/company-list.component';

export const routes: Routes = [
    { path: 'company/edit/:id', component: CompanyFormComponent },
    { path: 'company/list', component: CompanyListComponent },
    { path: 'company/:id', component: CompanyFormComponent },
    { path: '', redirectTo: 'company/list', pathMatch: 'full' }
];
