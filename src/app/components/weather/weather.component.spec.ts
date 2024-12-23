import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let mockWeatherService: jest.Mocked<WeatherService>;

  const mockWeatherData = {
    name: 'Test City',
    main: {
      temp: 25,
      temp_min: 20,
      temp_max: 30,
    },
    sys: {
      country: 'TC',
    },
    weather: [
      {
        icon: '01d',
      },
    ],
  };

  beforeEach(async () => {
    mockWeatherService = {
      getWeatherData: jest.fn().mockReturnValue(of(mockWeatherData)),
    } as unknown as jest.Mocked<WeatherService>;

    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [
        provideHttpClient(),
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Previsão do Tempo" and "Informe sua cidade"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('[data-test="weather-title"]');
    const city = compiled.querySelector('[data-test="weather-city"]');

    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Previsão do Tempo');

    expect(city).toBeTruthy();
    expect(city?.textContent).toContain('Informe sua cidade');
  });

  it('should display search input and button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector(
      '[data-test="weather-search-input"]'
    ) as HTMLInputElement;
    const button = compiled.querySelector(
      '[data-test="weather-search-button"]'
    ) as HTMLButtonElement;

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should display validation errors', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector(
      '[data-test="weather-search-input"]'
    ) as HTMLInputElement;
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(
      compiled.querySelector('[data-test="weather-error-required"]')
    ).toBeTruthy();

    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(
      compiled.querySelector('[data-test="weather-error-minlength"]')
    ).toBeTruthy();
  });

  it('should search for weather data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector(
      '[data-test="weather-search-input"]'
    ) as HTMLInputElement;
    const button = compiled.querySelector(
      '[data-test="weather-search-button"]'
    ) as HTMLButtonElement;

    input.value = 'Test City';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(mockWeatherService.getWeatherData).toHaveBeenCalledWith('Test City');
    expect(compiled.querySelector('[data-test="weather-data"]')).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    mockWeatherService.getWeatherData.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector(
      '[data-test="weather-search-input"]'
    ) as HTMLInputElement;
    const button = compiled.querySelector(
      '[data-test="weather-search-button"]'
    ) as HTMLButtonElement;

    input.value = 'Test City';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(mockWeatherService.getWeatherData).toHaveBeenCalledWith('Test City');
    expect(
      compiled.querySelector('[data-test="weather-error-message"]')
    ).toBeTruthy();
  });
});
