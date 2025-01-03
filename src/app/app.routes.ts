import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        data: {
            showHeader: true,
            showSidebar: true
        }
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
        data: {
            showHeader: true,
            showSidebar: true
        }
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)

    },
    {
        path: 'forbidden',
        loadComponent: () => import('./pages/forbidden/forbidden.component').then((c) => c.ForbiddenComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        data: {
            showHeader: false,
            showSidebar: false
        }
    }

];
