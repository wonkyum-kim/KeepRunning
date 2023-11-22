import prisma from '@/app/libs/prismadb';

export default async function getShoes() {
  const shoes = await prisma.shoes.findMany({
    where: {
      shoesId: 'clp7wp31z0000fagwsrquz80q',
    },
  });
  return shoes;
}
