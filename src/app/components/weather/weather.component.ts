import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IWeather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  weatherService = inject(WeatherService);
  formBuilder = inject(FormBuilder);

  weatherData = signal<IWeather | null>(null);
  weatherForm = this.formBuilder.group({
    search: ['', [Validators.required, Validators.minLength(3)]],
  });
  submitted = signal(false);
  error = signal(false);

  onSearch(): void {
    const searchedCity = this.weatherForm.get('search')?.value;
    if (this.weatherForm.valid && searchedCity) {
      this.getWeatherData(searchedCity);
      this.submitted.set(true);
    }
  }

  getWeatherData(cityName: string): void {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        this.submitted.set(true);
        this.weatherForm.reset();
        this.weatherData.set(response);
        this.submitted.set(false);
      },
      error: () => {
        this.error.set(true);
        this.submitted.set(false);
      },
    });
  }
}
