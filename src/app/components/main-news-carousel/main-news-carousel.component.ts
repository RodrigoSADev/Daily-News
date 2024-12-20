import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-carousel-ease';
import { IMainNew } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { RecentNewsComponent } from '../recent-news/recent-news.component';

@Component({
  selector: 'app-main-news-carousel',
  imports: [CommonModule, RecentNewsComponent, CarouselModule, RouterLink],
  templateUrl: './main-news-carousel.component.html',
  styleUrl: './main-news-carousel.component.scss',
})
export class MainNewsCarouselComponent {
  newsService = inject(NewsService);

  mainNews = signal<IMainNew[] | null>(null);

  ngOnInit(): void {
    this.newsService.getMainNews().subscribe((response) => {
      this.mainNews.set(response);
    });
  }
}
