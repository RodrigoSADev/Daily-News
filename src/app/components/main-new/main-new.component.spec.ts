import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IMainNew } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { MainNewComponent } from './main-new.component';

describe('MainNewComponent', () => {
  let component: MainNewComponent;
  let fixture: ComponentFixture<MainNewComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockNewsService: jest.Mocked<NewsService>;

  const mockMainNew: IMainNew = {
    id: 1,
    title: 'Test Title',
    subtitle: ['Subtitle 1', 'Subtitle 2'],
    content: 'Content Text',
    fullContent:
      'Paragraph 1\nParagraph 2\nParagraph 3\nParagraph 4\nParagraph 5\nParagraph 6',
    date: '2023-10-01',
    publishedAt: '2023-10-01T00:00:00Z',
    author: 'Author Name',
    category: 'Category',
    image: ['image1.jpg', 'image2.jpg'],
    alt: ['Alt text 1', 'Alt text 2'],
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        } as Partial<ParamMap>,
      },
    } as Partial<ActivatedRoute>;

    mockNewsService = {
      getMainNewById: jest.fn().mockReturnValue(of(mockMainNew)),
    } as unknown as jest.Mocked<NewsService>;

    await TestBed.configureTestingModule({
      imports: [MainNewComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: NewsService, useValue: mockNewsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load main news on init', () => {
    mockNewsService.getMainNewById.mockReturnValue(of(mockMainNew));

    component.ngOnInit();

    expect(mockNewsService.getMainNewById).toHaveBeenCalledWith('1');
    expect(component.mainNew()).toEqual(mockMainNew);
    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(false);
  });

  it('should handle error when loading main news', () => {
    mockNewsService.getMainNewById.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.ngOnInit();

    expect(mockNewsService.getMainNewById).toHaveBeenCalledWith('1');
    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(true);
  });

  it('should return the first part of the content', () => {
    const firstPart = component.getFirstPart(mockMainNew.fullContent);
    expect(firstPart).toBe(
      'Paragraph 1\nParagraph 2\nParagraph 3\nParagraph 4\nParagraph 5'
    );
  });

  it('should return the second part of the content', () => {
    const secondPart = component.getSecondPart(mockMainNew.fullContent);
    expect(secondPart).toBe('Paragraph 6');
  });

  it('should display main news content', () => {
    mockNewsService.getMainNewById.mockReturnValue(of(mockMainNew));
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="main-title"]')?.textContent?.trim()
    ).toBe(mockMainNew.title);
    expect(
      compiled.querySelector('[data-test="subtitle-0"]')?.textContent
    ).toBe(mockMainNew.subtitle[0]);
    expect(
      compiled.querySelector('[data-test="subtitle-1"]')?.textContent
    ).toBe(mockMainNew.subtitle[1]);
    expect(
      compiled.querySelector('[data-test="date-author"]')?.textContent
    ).toContain(mockMainNew.author);
    expect(
      compiled.querySelector('[data-test="date-author"]')?.textContent
    ).toContain('01/10/2023');
  });

  it('should display placeholders when loading', () => {
    component.isLoading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="placeholder-title"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="placeholder-button"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="placeholder-image-0"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="placeholder-image-1"]')
    ).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    component.hasError.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="error-message"]')?.textContent
    ).toContain(
      'Não foi possíver carregar a notícia principal, por favor, tente novamente mais tarde.'
    );
  });
});
