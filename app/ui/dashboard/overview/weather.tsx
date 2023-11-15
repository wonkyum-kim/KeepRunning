'use client';

import { WeatherInfo } from '@/app/types/weather-info';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Position = null | number;

// 비가 오는 것도...
function getRunningWeatherCondition(
  temperature: number,
  isSnowing: boolean,
  isRainning: boolean
) {
  if (isRainning) {
    return '비가오니 뛸 때 주의하세요!';
  }
  if (isSnowing) {
    return '눈이 오니 뛸 때 주의하세요!';
  }
  if (temperature < 5) {
    return '지금은 뛰기에 추워요!';
  } else if (temperature >= 5 && temperature < 10) {
    return '지금은 뛰기에 조금 쌀쌀해요!';
  } else if (temperature >= 10 && temperature < 24) {
    return '지금은 뛰기 딱 좋은 날씨네요!';
  } else {
    return '지금은 뛰기에 더워요!';
  }
}

export default function Weather() {
  const [latitude, setLatitude] = useState<Position>(null);
  const [longitude, setLongitude] = useState<Position>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  const success = (position: GeolocationPosition) => {
    setLatitude(Number(position.coords.latitude.toFixed(2)));
    setLongitude(Number(position.coords.longitude.toFixed(2)));
  };

  const getWeatherInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      setLatitude(-1);
      setLongitude(-1);
    }
  };

  useEffect(() => {
    async function getWeather() {
      const response = await fetch(
        `/api/weather?latitude=${latitude}&longitude=${longitude}`,
        {
          cache: 'no-store',
        }
      );
      const weather: WeatherInfo = await response.json();
      setWeather(weather);
    }
    if (latitude && longitude) getWeather();
  }, [latitude, longitude]);

  return (
    <div
      onClick={getWeatherInfo}
      className='text-white rounded-lg font-black text-3xl flex flex-col gap-8 items-center justify-center lg:w-[40%] min-h-[150px] lg:h-[50%] bg-indigo-400 shadow-lg shadow-gray-400'
    >
      {!latitude && !longitude && (
        <div className='cursor-pointer'>날씨 정보 불러오기</div>
      )}
      {latitude === -1 && longitude === -1 && (
        <div>현재 위치를 가져올 수 없음</div>
      )}
      {weather && (
        <div className='w-full h-full p-2 flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center'>
            <Image
              src={weather.icon}
              width={100}
              height={100}
              alt={weather.description}
              className='md:w-[150px] md:h-[150px]'
            />
            <div className='lg:text-4xl'>{weather.temp.toFixed(1)}°C</div>
          </div>
          <div className='text-xl'>{weather.name}</div>
          <div className='py-4'>
            {getRunningWeatherCondition(
              weather.temp,
              weather.snow,
              weather.rain
            )}
          </div>
        </div>
      )}
    </div>
  );
}
