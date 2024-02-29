'use client';

import { useEffect, useState } from 'react';
import { useGeoLocation } from './useGeoLocation';

export type WeatherInfo = {
  description: string;
  icon: string;
  temp: number;
  windSpeed: number;
  rain?: number;
};

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function useWeahter() {
  const { location, error } = useGeoLocation(geolocationOptions);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    async function getWeather() {
      const response = await fetch(
        `/api/weather?latitude=${location?.latitude}&longitude=${location?.longitude}`,
        {
          cache: 'no-store',
        }
      );
      const weather = await response.json();
      setWeather(weather);
    }
    if (!location?.latitude || !location?.longitude) return;
    getWeather();
  }, [location?.latitude, location?.longitude]);

  return weather;
}
