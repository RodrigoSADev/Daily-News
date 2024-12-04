import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  http = inject(HttpClient);

  private readonly API = 'https://daily-news-api-tau.vercel.app';

  getMainNews(): Observable<INews[]> {
    return this.http.get<INews[]>(`${this.API}/main-news`);
  }

  getRecentNews(): Observable<INews[]> {
    return this.http.get<INews[]>(`${this.API}/recent-news`);
  }

  getVariedNews(): Observable<INews[]> {
    return this.http.get<INews[]>(`${this.API}/varied-news`);
  }
}
