import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'noticias',
    pathMatch: 'full',
  },
  {
    path: 'noticias',
    loadComponent: () =>
      import('./components/main-news/main-news.component').then(
        (c) => c.MainNewsComponent
      ),
  },
  {
    path: 'noticias/:category',
    loadComponent: () =>
      import('./components/varied-news/varied-news.component').then(
        (c) => c.VariedNewsComponent
      ),
  },
];
