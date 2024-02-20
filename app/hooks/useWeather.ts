'use client';

import { useEffect, useState } from 'react';

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

export default function useWeahter() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      setLatitude(Number(position.coords.latitude.toFixed(2)));
      setLongitude(Number(position.coords.longitude.toFixed(2)));
    };
    const getGeoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      }
    };
    async function getWeather() {
      // 위도, 경도를 아직 불러오지 못했다면 종료합니다.
      if (!latitude || !longitude) return;
      const response = await fetch(
        `/api/weather?latitude=${latitude}&longitude=${longitude}`,
        {
          cache: 'no-store',
        }
      );
      const weather: WeatherInfo = await response.json();
      setWeather(weather);
    }

    getGeoLocation();
    getWeather();
  }, [latitude, longitude]);

  return weather;
}
