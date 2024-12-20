import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNewsCarouselComponent } from './main-news-carousel.component';

describe('MainNewsCarouselComponent', () => {
  let component: MainNewsCarouselComponent;
  let fixture: ComponentFixture<MainNewsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewsCarouselComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNewsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
