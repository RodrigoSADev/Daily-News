export interface IWeather {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    country: string;
  };
  weather: [
    {
      icon: string;
    }
  ];
}
