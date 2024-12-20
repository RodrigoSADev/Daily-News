import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMainNew, IRecentNew, IVariedNew } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  http = inject(HttpClient);

  private readonly API = 'https://daily-news-api-tau.vercel.app';

  getMainNews(): Observable<IMainNew[]> {
    return this.http.get<IMainNew[]>(`${this.API}/main-news`);
  }

  getMainNewById(id: string): Observable<IMainNew> {
    return this.http.get<IMainNew>(`${this.API}/main-news/${id}`);
  }

  getRecentNews(): Observable<IRecentNew[]> {
    return this.http.get<IRecentNew[]>(`${this.API}/recent-news`);
  }

  getVariedNewsByCategory(category: string): Observable<IVariedNew[]> {
    return this.http
      .get<IVariedNew[]>(`${this.API}/varied-news`)
      .pipe(map((news) => news.filter((item) => item.category === category)));
  }
}
