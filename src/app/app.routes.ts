import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./components/main-news/main-news.component').then(
        (c) => c.MainNewsComponent
      ),
  },
];
