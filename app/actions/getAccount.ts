import getCurrentUser from './getCurrentUser';
import prisma from '@/app/libs/prismadb';

export default async function getAccount() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return null;
  }
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    return account;
  } catch (error: unknown) {
    return null;
  }
}
