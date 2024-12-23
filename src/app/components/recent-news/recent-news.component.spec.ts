import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { IRecentNew } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { RecentNewsComponent } from './recent-news.component';

describe('RecentNewsComponent', () => {
  let component: RecentNewsComponent;
  let fixture: ComponentFixture<RecentNewsComponent>;
  let mockNewsService: jest.Mocked<NewsService>;

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

  beforeEach(async () => {
    mockNewsService = {
      getRecentNews: jest.fn().mockReturnValue(of(mockRecentNews)),
    } as unknown as jest.Mocked<NewsService>;

    await TestBed.configureTestingModule({
      imports: [RecentNewsComponent],
      providers: [
        provideHttpClient(),
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recent news on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(mockNewsService.getRecentNews).toHaveBeenCalled();
    expect(component.recentNews()).toEqual(mockRecentNews);
    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(false);
  });

  it('should handle error when loading recent news', () => {
    mockNewsService.getRecentNews.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockNewsService.getRecentNews).toHaveBeenCalled();
    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(true);
  });

  it('should display recent news content', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled
        .querySelector('[data-test="recent-news-title"]')
        ?.textContent?.trim()
    ).toBe('Notícias Recentes');
    const cards = compiled.querySelectorAll('[data-test="recent-news-card"]');
    expect(cards.length).toBe(2);

    mockRecentNews.forEach((news, index) => {
      const card = cards[index];
      expect(
        card
          .querySelector('[data-test="recent-news-card-image"]')
          ?.getAttribute('src')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="recent-news-card-title"]')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="recent-news-card-subtitle"]')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="recent-news-card-content"]')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="recent-news-card-author"]')
      ).toBeTruthy();
    });
  });

  it('should display placeholders when loading', () => {
    component.isLoading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="placeholder-title"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="placeholder-content"]')
    ).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    component.hasError.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="error-message"]')?.textContent
    ).toContain(
      'Não foi possíver carregar as notícias recentes, por favor, tente novamente mais tarde.'
    );
  });

  it('should render the weather component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-weather')).not.toBeNull();
  });
});
