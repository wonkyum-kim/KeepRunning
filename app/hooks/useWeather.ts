'use client';

import { useState } from 'react';
import { useGeoLocation } from './useGeoLocation';

export type WeatherInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  speed: number;
  deg: number;
  description: string;
  icon: string;
  name: string;
  rain: boolean;
  snow: boolean;
};

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function useWeahter() {
  const { location, error } = useGeoLocation(geolocationOptions);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  // TODO: get weather
  console.log(location, error);

  return weather;
}
