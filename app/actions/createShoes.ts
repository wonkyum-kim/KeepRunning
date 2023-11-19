'use server';

import prisma from '@/app/libs/prismadb';

export async function createShoes(formData: FormData) {
  const name = formData.get('shoesName')?.toString();
  const maker = formData.get('maker')?.toString();
  const image = formData.get('shoesImage')?.toString();

  if (!name || !image || !maker) {
    return null;
  }

  const shoes = await prisma.user.update({
    where: {
      name: '김원겸',
    },
    data: {
      shoes: {
        create: {
          name: name,
          maker: maker,
          image: image,
          mileage: 0,
          limit: 500,
        },
      },
    },
  });
}
