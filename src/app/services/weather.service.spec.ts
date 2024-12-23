import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IWeather } from '../interfaces/weather.interface';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const mockWeatherData: IWeather = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data', () => {
    const cityName = 'Test City';

    service.getWeatherData(cityName).subscribe((data) => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpMock.expectOne(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&node=json&appid=45e8b5ceb904739527adf6dcc9c687d0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should handle error', () => {
    const cityName = 'Test City';

    service.getWeatherData(cityName).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&node=json&appid=45e8b5ceb904739527adf6dcc9c687d0`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Invalid request parameters', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
