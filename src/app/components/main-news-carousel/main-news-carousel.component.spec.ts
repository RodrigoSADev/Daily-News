import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { IMainNew, IRecentNew } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { MainNewsCarouselComponent } from './main-news-carousel.component';

describe('MainNewsCarouselComponent', () => {
  let component: MainNewsCarouselComponent;
  let fixture: ComponentFixture<MainNewsCarouselComponent>;
  let mockNewsService: jest.Mocked<NewsService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  const mockMainNews: IMainNew[] = [
    {
      id: 1,
      title: 'Test Title 1',
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
      title: 'Test Title 2',
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

  beforeEach(async () => {
    mockNewsService = {
      getMainNews: jest.fn().mockReturnValue(of(mockMainNews)),
      getRecentNews: jest.fn().mockReturnValue(of(mockRecentNews)),
    } as unknown as jest.Mocked<NewsService>;

    await TestBed.configureTestingModule({
      imports: [MainNewsCarouselComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(MainNewsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load main news on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(mockNewsService.getMainNews).toHaveBeenCalled();
    expect(component.mainNews()).toEqual(mockMainNews);
  });

  it('should display main news carousel', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="carousel-title"]')?.textContent
    ).toBe('Notícias Principais');
    const slides = compiled.querySelectorAll('[data-test="carousel-slide"]');
    expect(slides.length).toBe(mockMainNews.length);

    mockMainNews.forEach((news, index) => {
      const slide = slides[index];
      expect(
        slide.querySelector('[data-test="carousel-image"]')?.getAttribute('src')
      ).toBe(news.image[0]);
      expect(
        slide
          .querySelector('[data-test="carousel-slide-title"]')
          ?.textContent?.trim()
      ).toBe(news.title);
      expect(
        slide
          .querySelector('[data-test="carousel-slide-content"]')
          ?.textContent?.trim()
      ).toBe(news.content);
      expect(
        slide
          .querySelector('[data-test="carousel-slide-author"]')
          ?.textContent?.trim()
      ).toContain(news.author);
    });
  });

  it('should render the recent news component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-recent-news')).not.toBeNull();
  });
});
