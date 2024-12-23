import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IVariedNew } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { VariedNewsComponent } from './varied-news.component';

describe('VariedNewsComponent', () => {
  let component: VariedNewsComponent;
  let fixture: ComponentFixture<VariedNewsComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockNewsService: jest.Mocked<NewsService>;

  const mockVariedNews: IVariedNew[] = [
    {
      id: 1,
      title: 'Varied News Title 1',
      subtitle: 'Varied News Subtitle 1',
      fullContent: 'Varied News Full Content 1',
      date: '2023-10-01',
      author: 'Varied Author 1',
      category: 'Category 1',
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
      category: 'Category 2',
      image: 'varied-image2.jpg',
      alt: 'Varied Alt text 2',
    },
  ];

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({
        get: jest.fn().mockReturnValue('tecnologia'),
      } as unknown as ParamMap),
    };

    mockNewsService = {
      getVariedNewsByCategory: jest.fn().mockReturnValue(of(mockVariedNews)),
    } as unknown as jest.Mocked<NewsService>;

    await TestBed.configureTestingModule({
      imports: [VariedNewsComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: NewsService, useValue: mockNewsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VariedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load varied news on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(mockNewsService.getVariedNewsByCategory).toHaveBeenCalledWith(
      'tecnologia'
    );
    expect(component.variedNews()).toEqual(mockVariedNews);
    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(false);
  });

  it('should handle error when loading varied news', () => {
    mockNewsService.getVariedNewsByCategory.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockNewsService.getVariedNewsByCategory).toHaveBeenCalledWith(
      'tecnologia'
    );
    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(true);
  });

  it('should display varied news content', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled
        .querySelector('[data-test="varied-news-title"]')
        ?.textContent?.trim()
    ).toBe('Notícias sobre Tecnologia');
    const cards = compiled.querySelectorAll('[data-test="varied-news-card"]');
    expect(cards.length).toBe(mockVariedNews.length);

    mockVariedNews.forEach((news, index) => {
      const card = cards[index];
      expect(
        card
          .querySelector('[data-test="varied-news-card-image"]')
          ?.getAttribute('src')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="varied-news-card-title"]')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="varied-news-card-subtitle"]')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="varied-news-card-full-content"]')
      ).toBeTruthy();
      expect(
        card.querySelector('[data-test="varied-news-card-author"]')
      ).toBeTruthy();
    });
  });

  it('should display placeholders when loading', () => {
    component.isLoading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="varied-news-placeholder-title"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="varied-news-placeholder-content"]')
    ).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    component.hasError.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="varied-news-error-message"]')
        ?.textContent
    ).toContain(
      'Não foi possíver carregar as notícias variadas, por favor, tente novamente mais tarde.'
    );
  });
});
