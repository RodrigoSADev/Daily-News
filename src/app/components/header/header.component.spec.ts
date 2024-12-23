import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="navbar-brand"]')?.textContent
    ).toContain('Daily News');
  });

  it('should render the menu button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="menu-button"]')?.textContent
    ).toContain('Menu');
  });

  it('should render the theme toggle component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-theme-toggle')).not.toBeNull();
  });
});
