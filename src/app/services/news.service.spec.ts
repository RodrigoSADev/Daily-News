import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IMainNew, IRecentNew, IVariedNew } from '../interfaces/news.interface';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  const mockMainNews: IMainNew[] = [
    {
      id: 1,
      title: 'Main News Title 1',
      subtitle: ['Subtitle 1'],
      content: 'Content Text 1',
      fullContent: 'Full Content Text 1',
      date: '2023-10-01',
      publishedAt: '2023-10-01T00:00:00Z',
      author: 'Author Name 1',
      category: 'Category 1',
      image: ['image1.jpg'],
      alt: ['Alt text 1'],
    },
    {
      id: 2,
      title: 'Main News Title 2',
      subtitle: ['Subtitle 2'],
      content: 'Content Text 2',
      fullContent: 'Full Content Text 2',
      date: '2023-10-02',
      publishedAt: '2023-10-02T00:00:00Z',
      author: 'Author Name 2',
      category: 'Category 2',
      image: ['image2.jpg'],
      alt: ['Alt text 2'],
    },
  ];

  const mockRecentNews: IRecentNew[] = [
    {
      id: 1,
      title: 'Recent News Title 1',
      subtitle: 'Recent News Subtitle 1',
      fullContent: 'Recent News Full Content 1',
      publishedAt: '2023-10-01T00:00:00Z',
      author: 'Recent Author 1',
      image: 'recent-image1.jpg',
      alt: 'Recent Alt text 1',
    },
    {
      id: 2,
      title: 'Recent News Title 2',
      subtitle: 'Recent News Subtitle 2',
      fullContent: 'Recent News Full Content 2',
      publishedAt: '2023-10-02T00:00:00Z',
      author: 'Recent Author 2',
      image: 'recent-image2.jpg',
      alt: 'Recent Alt text 2',
    },
  ];

  const mockVariedNews: IVariedNew[] = [
    {
      id: 1,
      title: 'Varied News Title 1',
      subtitle: 'Varied News Subtitle 1',
      fullContent: 'Varied News Full Content 1',
      date: '2023-10-01',
      author: 'Varied Author 1',
      category: 'tecnologia',
      image: 'varied-image1.jpg',
      alt: 'Varied Alt text 1',
    },
    {
      id: 2,
      title: 'Varied News Title 2',
      subtitle: 'Varied News Subtitle 2',
      fullContent: 'Varied News Full Content 2',
      date: '2023-10-02',
      author: 'Varied Author 2',
      category: 'politica',
      image: 'varied-image2.jpg',
      alt: 'Varied Alt text 2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch main news', () => {
    service.getMainNews().subscribe((data) => {
      expect(data).toEqual(mockMainNews);
    });

    const req = httpMock.expectOne(
      'https://daily-news-api-tau.vercel.app/main-news'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMainNews);
  });

  it('should fetch main news by id', () => {
    const id = '1';

    service.getMainNewById(id).subscribe((data) => {
      expect(data).toEqual(mockMainNews[0]);
    });

    const req = httpMock.expectOne(
      `https://daily-news-api-tau.vercel.app/main-news/${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMainNews[0]);
  });

  it('should fetch recent news', () => {
    service.getRecentNews().subscribe((data) => {
      expect(data).toEqual(mockRecentNews);
    });

    const req = httpMock.expectOne(
      'https://daily-news-api-tau.vercel.app/recent-news'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRecentNews);
  });

  it('should fetch varied news by category', () => {
    const category = 'tecnologia';

    service.getVariedNewsByCategory(category).subscribe((data) => {
      expect(data).toEqual([mockVariedNews[0]]);
    });

    const req = httpMock.expectOne(
      'https://daily-news-api-tau.vercel.app/varied-news'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockVariedNews);
  });

  it('should handle error', () => {
    service.getMainNews().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(
      'https://daily-news-api-tau.vercel.app/main-news'
    );
    expect(req.request.method).toBe('GET');
    req.flush('Invalid request parameters', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
