import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'shopping',
        pathMatch: 'full',
    },
    {
        path: 'shopping',
        children: [
        {
            path: '',
            loadComponent: () => import('./views/shopping/shopping-dashboard/shopping-dashboard.component').then(mod => mod.ShoppingDashboardComponent),
        },
        {
            path: ':id',
            loadComponent: () => import('./views/shopping/shopping-list-details/shopping-list-details.component').then(mod => mod.ShoppingListDetailsComponent),
        }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];