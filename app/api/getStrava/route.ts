import { getStrava } from '@/app/actions/getStrava';

export async function GET() {
  const strava = await getStrava();
  return Response.json(strava);
}
