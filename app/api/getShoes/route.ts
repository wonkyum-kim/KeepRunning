import getShoes from '@/app/actions/getShoes';

export async function GET() {
  const shoes = await getShoes();
  return Response.json(shoes);
}
