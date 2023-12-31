'use client';

import { useState, useEffect } from 'react';
import { CiUndo } from 'react-icons/ci';
import Image from 'next/image';

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
  const [latitude, setLatitude] = useState<number>(37.56);
  const [longitude, setLongitude] = useState<number>(126.91);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  const success = (position: GeolocationPosition) => {
    setLatitude(Number(position.coords.latitude.toFixed(2)));
    setLongitude(Number(position.coords.longitude.toFixed(2)));
  };

  const getGeoLocation = () => {
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
    getWeather();
  }, [latitude, longitude]);

  return (
    <div className='text-white rounded-lg font-black text-3xl flex flex-col gap-8 items-center justify-center flex-1 bg-sky-300 shadow-lg shadow-gray-400'>
      {!weather && <div>날씨 정보를 불러오는 중...</div>}
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
          <div className='text-2xl flex gap-4 items-center justify-center'>
            <div>{weather.name}</div>
            <div
              className='cursor-pointer hover:text-gray-400'
              onClick={getGeoLocation}
            >
              <CiUndo />
            </div>
          </div>
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
