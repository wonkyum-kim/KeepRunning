import { type NextRequest } from 'next/server';

// api document: https://openweathermap.org/current#one

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

  // 현재 날씨
  const description = result.weather[0].description;
  // 날씨 아이콘
  const icon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
  // 온도(Celsius)
  const temp = result.main.temp.toFixed(0);
  // 풍속(m/s)
  const windSpeed = result.wind.speed.toFixed(0);
  // 강수량 (1h, mm)
  const rain = result?.rain?.['1h'].toFixed(0);

  return Response.json({
    description,
    icon,
    temp,
    windSpeed,
    rain,
  });
}
