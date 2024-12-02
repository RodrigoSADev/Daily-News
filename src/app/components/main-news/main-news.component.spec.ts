import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNewsComponent } from './main-news.component';

describe('MainNewsComponent', () => {
  let component: MainNewsComponent;
  let fixture: ComponentFixture<MainNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
