import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IMainNew } from '../../interfaces/news.interface';
import { ParagraphPipe } from '../../pipes/paragraph.pipe';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-main-new',
  imports: [ParagraphPipe, RouterLink, CommonModule],
  templateUrl: './main-new.component.html',
  styleUrl: './main-new.component.scss',
})
export class MainNewComponent implements OnInit {
  actRoute = inject(ActivatedRoute);
  newsService = inject(NewsService);

  mainNew = signal<IMainNew | null>(null);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.actRoute.snapshot.paramMap.get('id')!;
    this.newsService.getMainNewById(id).subscribe({
      next: (response) => {
        this.mainNew.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }

  getFirstPart(content: string): string {
    const paragraphs = content.split('\n');
    return paragraphs.slice(0, 5).join('\n');
  }

  getSecondPart(content: string): string {
    const paragraphs = content.split('\n');
    return paragraphs.slice(5).join('\n');
  }
}
