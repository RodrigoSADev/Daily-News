import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);

  private readonly apiKey = '45e8b5ceb904739527adf6dcc9c687d0';

  getWeatherData(cityName: string): Observable<IWeather> {
    return this.http.get<IWeather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&node=json&appid=${this.apiKey}`
    );
  }
}
