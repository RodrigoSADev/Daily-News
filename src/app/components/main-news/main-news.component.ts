import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { INews } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-main-news',
  imports: [CommonModule],
  templateUrl: './main-news.component.html',
  styleUrl: './main-news.component.scss',
})
export class MainNewsComponent implements OnInit {
  newsService = inject(NewsService);

  mainNews = signal<INews[] | null>(null);
  isFirst = signal<boolean>(true);

  ngOnInit(): void {
    this.newsService.getMainNews().subscribe((response) => {
      this.mainNews.set(response);
    });
  }
}
