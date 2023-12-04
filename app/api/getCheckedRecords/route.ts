import getRecordsWithThisShoes from '@/app/actions/getRecordsWithThisShoes';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const records = await getRecordsWithThisShoes(name!);
  return Response.json(records);
}
