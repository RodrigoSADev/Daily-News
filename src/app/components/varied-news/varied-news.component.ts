import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from '../../interfaces/news.interface';
import { ParagraphPipe } from '../../pipes/paragraph.pipe';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-varied-news',
  imports: [CommonModule, ParagraphPipe],
  templateUrl: './varied-news.component.html',
  styleUrl: './varied-news.component.scss',
})
export class VariedNewsComponent implements OnInit {
  newsService = inject(NewsService);
  actRoute = inject(ActivatedRoute);

  variedNews = signal<INews[] | null>(null);
  category = signal<string | null>(null);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  categoryMap: { [key: string]: string } = {
    tecnologia: 'Tecnologia',
    politica: 'Política',
    esportes: 'Esportes',
    ciencia: 'Ciência',
  };

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      this.isLoading.set(true);
      const category = params.get('category')!;
      this.category.set(this.categoryMap[category] || category);
      this.newsService.getVariedNewsByCategory(category).subscribe({
        next: (response) => {
          this.variedNews.set(response);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.hasError.set(true);
        },
      });
    });
  }
}
