import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VariedNewsComponent } from './varied-news.component';

describe('VariedNewsComponent', () => {
  let component: VariedNewsComponent;
  let fixture: ComponentFixture<VariedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariedNewsComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(VariedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
