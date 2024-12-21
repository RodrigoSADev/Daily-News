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
      import(
        './components/main-news-carousel/main-news-carousel.component'
      ).then((c) => c.MainNewsCarouselComponent),
  },
  {
    path: 'noticias/:category',
    loadComponent: () =>
      import('./components/varied-news/varied-news.component').then(
        (c) => c.VariedNewsComponent
      ),
  },
  {
    path: 'noticia-principal/:id',
    loadComponent: () =>
      import('./components/main-new/main-new.component').then(
        (c) => c.MainNewComponent
      ),
  },
];
