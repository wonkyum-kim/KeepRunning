import prisma from '@/app/libs/prismadb';

export default async function getShoes() {
  const shoes = await prisma.shoes.findMany({
    where: {
      shoesId: 'clpquncv30001e24ksl0z03nq',
    },
  });
  return shoes;
}
