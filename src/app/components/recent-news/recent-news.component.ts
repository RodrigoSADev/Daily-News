import { Component, inject, OnInit, signal } from '@angular/core';
import { INews } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-recent-news',
  imports: [WeatherComponent],
  templateUrl: './recent-news.component.html',
  styleUrl: './recent-news.component.scss',
})
export class RecentNewsComponent implements OnInit {
  newsService = inject(NewsService);

  recentNews = signal<INews[] | null>(null);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.newsService.getRecentNews().subscribe({
      next: (response) => {
        this.recentNews.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }
}
