import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode on button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-test="theme-toggle-button"]'
    ) as HTMLElement;

    button.click();
    fixture.detectChanges();

    expect(component.isDarkMode).toBe(true);
    expect(document.body.getAttribute('data-bs-theme')).toBe('dark');

    button.click();
    fixture.detectChanges();

    expect(component.isDarkMode).toBe(false);
    expect(document.body.getAttribute('data-bs-theme')).toBe('light');
  });

  it('should display the correct icon based on the theme', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector(
      '[data-test="theme-toggle-icon"]'
    ) as HTMLElement;

    expect(icon.classList).toContain('bi-moon-stars');

    component.toggleDarkMode();
    fixture.detectChanges();

    expect(icon.classList).toContain('bi-brightness-high');

    component.toggleDarkMode();
    fixture.detectChanges();

    expect(icon.classList).toContain('bi-moon-stars');
  });
});
