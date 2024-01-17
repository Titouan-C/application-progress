import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'company',
        loadChildren: () => import('./company/company.module')
            .then(m => m.CompanyModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module')
            .then(m => m.AdminModule), canActivate: [authGuard]
    },
    { path: '', redirectTo: 'company', pathMatch: 'full' }
];
