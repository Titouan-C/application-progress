import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'company',
        loadChildren: () => import('./company/company.module')
            .then(m => m.CompanyModule)
    },
    { path: '', redirectTo: 'company', pathMatch: 'full' }
];
