import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { INews } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { RecentNewsComponent } from '../recent-news/recent-news.component';

@Component({
  selector: 'app-main-news',
  imports: [CommonModule, RecentNewsComponent],
  templateUrl: './main-news.component.html',
  styleUrl: './main-news.component.scss',
})
export class MainNewsComponent implements OnInit {
  newsService = inject(NewsService);

  mainNews = signal<INews[] | null>(null);

  ngOnInit(): void {
    this.newsService.getMainNews().subscribe((response) => {
      this.mainNews.set(response);
    });
  }
}
