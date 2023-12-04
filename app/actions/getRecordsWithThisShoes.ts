import prisma from '@/app/libs/prismadb';

export default async function getRecordsWithThisShoes(name: string) {
  const shoes = await prisma.shoes.findFirst({
    where: {
      name: name,
    },
    include: {
      records: true,
    },
  });

  return shoes?.records;
}
