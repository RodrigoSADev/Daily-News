import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MainNewComponent } from './main-new.component';

describe('MainNewComponent', () => {
  let component: MainNewComponent;
  let fixture: ComponentFixture<MainNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
