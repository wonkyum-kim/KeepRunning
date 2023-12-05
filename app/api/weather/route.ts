import { type NextRequest } from 'next/server';
import { WeatherInfo } from '@/app/ui/dashboard/overview/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('lat', latitude!);
  url.searchParams.append('lon', longitude!);
  url.searchParams.append('appid', process.env.WEATHER_API_KEY as string);
  url.searchParams.append('lang', 'kr');
  url.searchParams.append('units', 'metric');

  const response = await fetch(url, { cache: 'no-store' });
  const result = await response.json();

  const description = result.weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
  const isRainning = Object.keys(result).includes('rain');
  const isSnowing = Object.keys(result).includes('snow');

  const returnVal: WeatherInfo = {
    ...result.main,
    ...result.wind,
    name: result.name,
    description,
    icon,
    rain: isRainning,
    snow: isSnowing,
  };

  return Response.json(returnVal);
}
