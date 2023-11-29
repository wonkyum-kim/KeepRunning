import { decode } from '@googlemaps/polyline-codec';

async function reAuthorize() {
  const auth_link = 'https://www.strava.com/oauth/token';
  const response = await fetch(auth_link, {
    method: 'POST',
    next: { revalidate: 3600 },
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_ID as string,
      client_secret: process.env.STRAVA_SECRET as string,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN as string,
      grant_type: 'refresh_token',
    }),
  });

  return response.json();
}

export async function getStrava() {
  const { access_token } = await reAuthorize();
  const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;

  const response = await fetch(activities_link, {
    next: { revalidate: 3600 },
  });

  const result = await response.json();

  for (let i = 0; i < result.length; ++i) {
    const encoded = result[i].map.summary_polyline;
    result[i].decoded = decode(encoded, 5);
  }
  return result;
}
