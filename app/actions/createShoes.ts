'use server';

import prisma from '@/app/libs/prismadb';

export async function createShoes(formData: FormData) {
  const name = formData.get('shoesName')?.toString();
  const maker = formData.get('shoesMaker')?.toString();
  const image = formData.get('shoesImage')?.toString();

  if (!name || !image || !maker) {
    return null;
  }

  console.log(name, maker, image);

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
